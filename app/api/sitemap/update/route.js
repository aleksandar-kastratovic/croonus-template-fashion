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
  const clientIP =
    req.headers["X-Forwarded-For"] ||
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"];
  const Authorization =
    req.headers["authorization"] ||
    req.headers["Authorization"] ||
    req.headers["x-secret-key"];

  console.log("referer", referer);
  console.log("clientIP", clientIP);
  console.log("Authorization", Authorization);

  console.log("Request Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Request Method:", req.method);
  console.log("Request URL:", req.url);

  console.log("CF-Connecting-IP:", req.headers["cf-connecting-ip"]);
  console.log("X-Client-IP:", req.headers["x-client-ip"]);

  console.log("Referer:", req.headers["Referer"] || req.headers["referer"]);
  console.log("Origin:", req.headers["Origin"] || req.headers["origin"]);

  console.log("X-Forwarded-Proto:", req.headers["x-forwarded-proto"]);
  console.log("X-Real-IP:", req.headers["x-real-ip"]);
  console.log("Forwarded:", req.headers["forwarded"]);

  const body = await req.json();
  console.log("Request Body:", body);

  for (const [key, value] of req.headers.entries()) {
    console.log(`${key}: ${value}`);
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
