const { fetch } = require("../../../api/api_staging");
const fs = require("fs");
const path = require("path");

/**
 * Odgovor za API
 *
 * @param {string} message - Poruka odgovora.
 * @param {number} status - HTTP status kod.
 * @returns {Response} - HTTP odgovor.
 */
function createResponse(message, status) {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Kreira sitemap fajlove sa odgovarajućom strukturom direktorijuma
 * Fajlovi se generisu u `/tmp` direktorijumu
 *
 * @param {Array} sitemapData - Podaci o sitemap fajlovima (putanja i sadržaj)
 */


const createSitemapFiles = (sitemapData, baseUrl ) => {
  sitemapData.forEach(({ path: filePath, content }) => {

   // Modifikovanje sadržaja: razlikuje XML fajlove i prave stranice
   const updatedContent = content.replace(
    /<loc>(.*?)<\/loc>/g, // Regularni izraz za pronalaženje <loc> tagova
    (_, loc) => {
      // Ako URL ukazuje na XML fajl, koristi `slug` za API
      if (loc.endsWith(".xml")) {
        return `<loc>${baseUrl}/api/sitemap?slug=${filePath}</loc>`;
      }
      // Ako je URL prava stranica, ostavlja originalni link
      return `<loc>${loc}</loc>`;
    }
  );

    // Formiranje putanje do fajla u `/tmp` direktorijumu
    const outputPath = path.join("/tmp", filePath);

    console.log(`Attempting to create file: ${outputPath}`);

    // Kreiranje potrebnih direktorijuma ukoliko ne postoje
    const outputDir = path.dirname(outputPath);
    fs.mkdirSync(outputDir, { recursive: true });

    // Zapisivanje XML sadržaja u fajl
    fs.writeFileSync(outputPath, updatedContent, "utf-8");
    console.log(`Sitemap file created: ${filePath}`);
  });
}


// const createSitemapFiles = (sitemapData) => {
//   sitemapData.forEach(({ path: filePath, content }) => {
//     // Formiranje putanje do fajla u `/tmp` direktorijumu
//     const outputPath = path.join("/tmp", filePath);

//     console.log(`Attempting to create file: ${outputPath}`);

//     // Kreiranje potrebnih direktorijuma ukoliko ne postoje
//     const outputDir = path.dirname(outputPath);
//     fs.mkdirSync(outputDir, { recursive: true });

//     // Zapisivanje XML sadržaja u fajl
//     fs.writeFileSync(outputPath, content, "utf-8");
//     console.log(`Sitemap file created: ${filePath}`);
//   });
// };

/**
 * Proverava da li postoji direktorijum `/tmp` i briše sav sadržaj unutar njega
 * kako bi se osiguralo da novi sitemap fajlovi ne preklapaju postojeće.
 */
const deleteOldSitemaps = () => {
  const sitemapDir = "/tmp/sitemap";
  if (fs.existsSync(sitemapDir)) {
    // Brisanje svih fajlova i poddirektorijuma unutar sitemap direktorijuma
    fs.readdirSync(sitemapDir).forEach((file) => {
      const filePath = path.join(sitemapDir, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
    });
    console.log("Old sitemap files deleted.");
  } else {
    console.log("No sitemap directory found to delete.");
  }
};

/**
 * buildSitemapFile - Glavna funkcija za generisanje sitemap fajlova
 *
 * Ova funkcija:
 * 1. Briše stare sitemap fajlove.
 * 2. Iterira kroz svaki fajl i preuzima njegov sadržaj.
 * 3. Generiše nove fajlove u `/tmp` direktorijumu.
 *
 * @returns {Promise<{ success: boolean }>} - Indikacija uspešnosti generisanja sitemap-a.
 */
const buildSitemapFile = async (fileList, baseUrl) => {
  try {

    console.log('LIST OF SITEMAP FILES:',fileList)

    // Brise vec kreirane fajlove ako postoje
    deleteOldSitemaps();

    const sitemapData = [];

    // Iteracija kroz fajlove i dohvatanje njihovog sadržaja
    for (const file of fileList) {
      console.log(`Generated file: ${file.path}`);

      try {
        const fetchResponse = await fetch(`/sitemap`, { path: file.path });
        const base64Content = fetchResponse?.payload?.file_base64;
console.log("fetchResponse?.payload",fetchResponse?.payload)
        if (!base64Content) {
          console.warn(`No content found for file: ${file.path}`);
          continue;
        }

        const base64Data = base64Content.split(",")[1];
        const xmlContent = Buffer.from(base64Data, "base64").toString("utf-8");

        sitemapData.push({ path: file.path, content: xmlContent });
      } catch (fetchError) {
        console.error(
          `Error fetching content for file: ${file.path}`,
          fetchError
        );
        continue;
      }
    }

    // Provera da li ima prikupljenih podataka za zapisivanje
    if (sitemapData.length === 0) {
      throw new Error("No valid sitemap data fetched");
    }

    // Kreiranje sitemap fajlova sa odgovarajućom strukturom direktorijuma
    createSitemapFiles(sitemapData, baseUrl);

    console.log("Sitemap generation completed successfully.");
    return createResponse("Sitemap successfully updated.", 200);
  } catch (error) {
    console.error("Error during sitemap generation:", error.message);
    throw error;
  }
};

module.exports = { buildSitemapFile };
