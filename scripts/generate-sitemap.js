const { get, list, fetch } = require("../api/api_staging");
const fs = require("fs");
const path = require("path");

const buildSitemapFile = async () => {
  try {
    // Provera statusa
    const statusResponse = await get(/sitemap/status);
    if (!statusResponse?.payload) throw new Error("Sitemap not available");

    // Dohvatanje liste fajlova
    const filesResponse = await list(/sitemap/files);
    const files = filesResponse?.payload?.files;
    if (!files || files.length === 0) throw new Error("No sitemap files found");

    const sitemapData = [];
    for (const file of files) {
      // Fetchovanje sadržaja
      const fetchResponse = await fetch('/sitemap', { path: file.path });
      const base64Content = fetchResponse?.payload?.file_base64;

      const base64Data = base64Content.split(",")[1];

      if (!base64Data) {
        console.warn(`No content for path:${file.path}` );
        continue;
      }

      // Dekodiranje i validacija XML-a
      const xmlContent = Buffer.from(base64Data, "base64").toString("utf-8");

      sitemapData.push({ path: file.path, content: xmlContent });
    }

    // Provera da li ima podataka za zapisivanje
    if (sitemapData.length === 0)
      throw new Error("No valid sitemap data fetched");

    // Kreiranje pojedinačnih sitemap fajlova
    sitemapData.forEach(({ path: filePath, content }) => {
      const fileName = filePath.split("/").pop();
      const outputPath = path.join(process.cwd(), "public", fileName);
      fs.writeFileSync(outputPath, content, "utf-8");
    });

    // Kreiranje glavnog sitemap.xml
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

    return { success: true };
  } catch (error) {
    throw error;
  }
};

buildSitemapFile()
  .then(() => console.log("Sitemap generated successfully"))
  .catch((error) => console.error("Error generating sitemap:", error));