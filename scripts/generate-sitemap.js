/**
 * generateSitemap - Generiše sitemap fajlove ukoliko je status true
 * Funkcija se poziva prilikom build procesa.
 *
 * @returns {Promise<{ success: boolean }>}
 */

const { get } = require("../api/api_staging");
const { buildSitemapFile } = require("../app/api/sitemap/buildSitemapFile");

const generateSitemap = async () => {
  try {
    // Provera statusa sitemap-a sa API-ja
    const statusResponse = await get(`/sitemap/status`);
    if (!statusResponse?.payload) {
      console.error("Sitemap status is unavailable or false.");
      throw new Error("Sitemap not available");
    }
    if (statusResponse.payload.status === true) {
      await buildSitemapFile();
      return { success: true };
    } else {
      console.log("Sitemap status is false. No updates needed.");
      return { success: false };
    }
  } catch (error) {
    console.error("Error during sitemap generation:", error.message);
    throw error;
  }
};

// Pokretanje generisanja sitemap-a
generateSitemap()
  .then(() => console.log("Sitemap generated successfully"))
  .catch((error) => console.error("Sitemap generation failed:", error.message));
