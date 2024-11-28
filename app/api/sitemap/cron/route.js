/*
Kod potreban za lokalno testiranje. Kada se pusti u produkciju obrisati
 export const config = {
     runtime: "nodejs",
   };
*/

import { buildSitemapFile } from "@/app/api/sitemap/buildSitemapFile";
import { get } from "@/api/api_staging";

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
 * API ruta za zakazano osvežavanje sitemap fajlova
 *
 * @param {Request} req - HTTP zahtev koji sadrži informacije o autorizaciji cron secret.
 * @returns {Promise<Response>} - JSON odgovor o statusu osvežavanja sitemap-a.
 */

export async function GET(req) {
  // Provera autorizacije
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return createResponse("Unauthorized", 401);
  }

  try {
    console.log("Cron job triggered at:", new Date().toISOString());

    // Provera statusa sitemap-a sa API-ja
    const statusResponse = await get(`/sitemap/status`);
    const status = statusResponse?.payload.status;

    if (status === true) {
      console.log("Sitemap status is true. Regenerating sitemap...");
      await buildSitemapFile();
      return createResponse("Sitemap successfully updated.", 200);
    } else {
      return createResponse("No changes detected in sitemap.", 200);
    }
  } catch (error) {
    console.error("Error in cron job:", error.message);
    return createResponse("Failed to update sitemap.", 500);
  }
}
