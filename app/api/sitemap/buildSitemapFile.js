/*
 * Modul za generisanje sitemap fajlova
 *
 * Omogućava dinamičko kreiranje sitemap fajlova na osnovu podataka dobijenih
 * od API-ja. Fajlovi se generišu u `/tmp` direktorijumu zbog ograničenja Vercel platforme.
 */

const { list, fetch } = require("../../../api/api_staging");
const fs = require("fs");
const path = require("path");

/**
 * Kreira sitemap fajlove sa odgovarajućom strukturom direktorijuma
 *
 * @param {Array} sitemapData - Podaci o sitemap fajlovima (putanja i sadržaj)
 */
const createSitemapFiles = (sitemapData) => {
  sitemapData.forEach(({ path: filePath, content }) => {
    // Formiranje putanje do fajla u `/tmp` direktorijumu
    const outputPath = path.join("/tmp", filePath);

    console.log(`Attempting to create file: ${outputPath}`);

    // Kreiranje potrebnih direktorijuma ukoliko ne postoje
    const outputDir = path.dirname(outputPath);
    fs.mkdirSync(outputDir, { recursive: true });

    // Zapisivanje XML sadržaja u fajl
    fs.writeFileSync(outputPath, content, "utf-8");
    console.log(`Sitemap file created: ${filePath}`);
  });
};

/**
 * Proverava da li postoji direktorijum `/tmp` i briše sav sadržaj unutar njega
 * kako bi se osiguralo da novi sitemap fajlovi ne preklapaju postojeće.
 */
const deleteOldSitemaps = () => {
  const sitemapDir = "/tmp";
  if (fs.existsSync(sitemapDir)) {
    fs.rmdirSync(sitemapDir, { recursive: true });
    console.log("Old sitemap files deleted.");
  } else {
    console.log("No old sitemap files found.");
  }
};

/**
 * buildSitemapFile - Glavna funkcija za generisanje sitemap fajlova
 *
 * Ova funkcija:
 * 1. Briše stare sitemap fajlove.
 * 2. Dohvata listu fajlova za sitemap sa API-ja.
 * 3. Iterira kroz svaki fajl i preuzima njegov sadržaj.
 * 4. Generiše nove fajlove u `/tmp` direktorijumu.
 *
 * @returns {Promise<{ success: boolean }>} - Indikacija uspešnosti generisanja sitemap-a.
 */
const buildSitemapFile = async () => {
  try {
    // Brise vec kreirane fajlove ako postoje
    deleteOldSitemaps();

    // Dohvatanje liste fajlova za sitemap
    const filesResponse = await list(`/sitemap/files`);
    const files = filesResponse?.payload?.files;
    if (!files || files.length === 0) {
      console.error("No sitemap files found.");
      throw new Error("No sitemap files found");
    }

    const sitemapData = [];

    // Iteracija kroz fajlove i dohvatanje njihovog sadržaja
    for (const file of files) {
      console.log(`Generated file: ${file.path}`);

      try {
        const fetchResponse = await fetch(`/sitemap`, { path: file.path });
        const base64Content = fetchResponse?.payload?.file_base64;

        if (!base64Content) {
          console.warn(`No content found for file: ${file.path}`);
          continue;
        }

        const base64Data = base64Content.split(",")[1];
        const xmlContent = Buffer.from(base64Data, "base64").toString("utf-8");

        sitemapData.push({ path: file.path, content: xmlContent });
      } catch (fetchError) {
        console.error(`Error fetching content for file: ${file.path}`, fetchError);
        continue;
      }
    }

    // Provera da li ima prikupljenih podataka za zapisivanje
    if (sitemapData.length === 0) {
      console.error("No valid sitemap data fetched.");
      throw new Error("No valid sitemap data fetched");
    }

    // Kreiranje sitemap fajlova sa odgovarajućom strukturom direktorijuma
    createSitemapFiles(sitemapData);

    console.log("Sitemap generation completed successfully.");
    return { success: true };
  } catch (error) {
    console.error("Error during sitemap generation:", error.message);
    throw error;
  }
};

module.exports = { buildSitemapFile };
