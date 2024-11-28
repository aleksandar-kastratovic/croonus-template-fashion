/**
 * generateSitemap - Generiše sitemap fajlove ukoliko je status true
 * Funkcija se poziva prilikom build procesa.
 *
 * @returns {Promise<{ success: boolean }>}
 */

const { buildSitemapFile } = require("../../app/api/sitemap/buildSitemapFile");

const generateSitemap = async () => {
  try {
    await buildSitemapFile();
  } catch (error) {
    console.error("Error during sitemap generation:", error.message);
    throw error;
  }
};

// Pokretanje generisanja sitemap-a
generateSitemap()
  .then(() => console.log("Sitemap generated successfully"))
  .catch((error) => console.error("Sitemap generation failed:", error.message));
