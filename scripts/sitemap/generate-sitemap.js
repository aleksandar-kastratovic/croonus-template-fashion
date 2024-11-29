/**
 * generateSitemap - Generiše sitemap fajlove ukoliko je status true
 * Funkcija se poziva prilikom build procesa.
 *
 * @returns {Promise<{ success: boolean }>}
 */

const { buildSitemapFile } = require("../../app/api/sitemap/buildSitemapFile");
const { list } = require("../../api/api_staging");

const generateSitemap = async () => {
  try {
    // Dohvatanje liste fajlova za sitemap
    const filesResponse = await list(`/sitemap/files`);
    const files = filesResponse?.payload?.files;
    if (!files || files.length === 0) {
      console.error("No sitemap files found.");
      throw new Error("No sitemap files found");
    }

    if (filesResponse) console.log("!!!!!filesResponse!!!!!!", filesResponse);

    if (files) await buildSitemapFile(files, 'http://localhost:3000');
  } catch (error) {
    console.error("Error during sitemap generation:", error.message);
    throw error;
  }
};

// Pokretanje generisanja sitemap-a
generateSitemap();
