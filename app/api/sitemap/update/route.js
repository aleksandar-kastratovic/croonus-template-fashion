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
  console.log("req", req);

  const referer = req.headers.referer || req.headers.origin || "";
  const clientIP = req.headers["x-forwarded-for"] || req.headers["x-real-ip"];
  const providedSecret =
    req.headers["authorization"] || req.headers["x-secret-key"];

  console.log("referer", referer);
  console.log("clientIP", clientIP);
  console.log("providedSecret", providedSecret);

  const body = await req.json();
  console.log("Received data from backend:", body);

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
