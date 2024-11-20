const { get, list, fetch } = require("../api/api_staging");
const fs = require("fs");
const path = require("path");

/**
 * buildSitemapFile - Generiše sitemap fajlove za aplikaciju
 * Funkcija se poziva prilikom build procesa.
 * Dohvata podatke preko API-ja, kreira pojedinačne XML fajlove i glavni sitemap.
 *
 * @returns {Promise<{ success: boolean }>} - Indikacija uspešnosti generisanja sitemap-a
 * @throws {Error} - Ako dođe do greške tokom procesa generisanja
 */
const buildSitemapFile = async () => {
  try {
    // Provera statusa sitemap-a sa API-ja
    const statusResponse = await get(`/sitemap/status`);
    if (!statusResponse?.payload) {
      console.error("Sitemap status is unavailable or false.");
      throw new Error("Sitemap not available");
    }

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
        console.error(
          `Error fetching content for file: ${file.path}`,
          fetchError
        );
        continue;
      }
    }

    // Provera da li ima prikupljenih podataka za zapisivanje
    if (sitemapData.length === 0) {
      console.error("No valid sitemap data fetched.");
      throw new Error("No valid sitemap data fetched");
    }

    // Kreiranje pojedinačnih sitemap fajlova
    sitemapData.forEach(({ path: filePath, content }) => {
      const fileName = filePath.split("/").pop();
      const outputPath = path.join(process.cwd(), "public", fileName);
      fs.writeFileSync(outputPath, content, "utf-8");
      console.log(`Sitemap file created: ${fileName}`);
    });

    // Kreiranje glavnog sitemap.xml fajla
    const urls = sitemapData.map(({ path: filePath }) => {
      const fileName = filePath.split("/").pop();
      return `<sitemap><loc>http://localhost:3000/${fileName}</loc></sitemap>`;
    });

    const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.join("\n")}
      </sitemapindex>`;

    const globalSitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
    fs.writeFileSync(globalSitemapPath, indexXml, "utf-8");
    console.log("Global sitemap created: sitemap.xml");

    return { success: true };
  } catch (error) {
    console.error("Error during sitemap generation:", error.message);
    throw error;
  }
};

// Pokretanje generisanja sitemap-a
buildSitemapFile()
  .then(() => console.log("Sitemap generated successfully"))
  .catch((error) => console.error("Sitemap generation failed:", error.message));
