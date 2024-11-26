/*
 * API ruta za zakazano osvežavanje sitemap fajlova
 *
 * Automatsko pokretanje regeneracije sitemap fajlova putem Vercel Scheduled Functions.
 * Proverava status sitemap-a, i ako je potrebno, regeneriše fajlove.
 *
 */

/*
Kod potreban za lokalno testiranje. Kada se pusti u produkciju obrisati
 export const config = {
     runtime: "nodejs",
   };
*/

import { buildSitemapFile } from "@/app/api/sitemap/buildSitemapFile";
import { get } from "@/api/api_staging";

/**
 * GET handler za cron rutu
 *
 * @returns {Promise<Response>} - JSON odgovor o statusu sitemap regeneracije.
 */

export async function GET(req) {

  // Provera autorizacije
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    console.log("Cron job triggered at:", new Date().toISOString());

    // Provera statusa sitemap-a sa API-ja
    const statusResponse = await get(`/sitemap/status`);
    const status = statusResponse?.payload.status;

    if (status === false) {
      console.log("Sitemap status is true. Regenerating sitemap...");
      await buildSitemapFile();
      return new Response(JSON.stringify({ message: "Sitemap successfully updated." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.log("Sitemap status is false. No updates needed.");
      return new Response(JSON.stringify({ message: "No changes detected in sitemap." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error in cron job:", error.message);
    return new Response(JSON.stringify({ message: "Failed to update sitemap." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
