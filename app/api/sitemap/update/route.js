/*
Kod potreban za lokalno testiranje. Kada se pusti u produkciju obrisati

*/
// export const config = {
//   runtime: "nodejs",
// };

import { buildSitemapFile } from "@/app/api/sitemap/buildSitemapFile";

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

export async function POST(req) {
  const clientIP = req.headers.get("x-forwarded-for");

  console.log("clientIP", clientIP);
  console.log("process.env.SERVER_IP", process.env.SERVER_IP);

  if (clientIP !== process.env.SERVER_IP) {
    return new Response("Unauthorized", { status: 403 });
  }

  // Dinamički izvlacenje protokola i hosta
  const { headers } = req;
  const protocol = headers.get("x-forwarded-proto") || "http";
  const host = headers.get("host") || "localhost:3000";
  const baseUrl = `${protocol}://${host}`;

  try {
    await buildSitemapFile(body.files, baseUrl);
    return createResponse("Sitemap successfully updated.", 200);
  } catch (error) {
    console.error("Error in cron job:", error.message);
    return createResponse("Failed to update sitemap.", 500);
  }
}
