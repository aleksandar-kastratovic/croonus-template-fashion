import fs from "fs";
import path from "path";

/**
 * Kreira HTTP odgovor sa zadatim statusom, porukom i opcionalnim zaglavljima.
 *
 * @param {string} message - Poruka odgovora.
 * @param {number} status - HTTP status kod.
 * @param {Object} [headers] - Dodatni HTTP zaglavlja (opciono).
 * @returns {Response} - HTTP odgovor.
 */
function createResponse(
  message,
  status,
  headers = { "Content-Type": "application/json" }
) {
  const body =
    headers["Content-Type"] === "application/json"
      ? JSON.stringify({ message })
      : message;
  return new Response(body, { status, headers });
}

/**
 * API ruta za dinamičko serviranje sitemap fajlova na osnovu query parametra `slug`.
 * Omogućava crawler-ima pristup sitemap fajlovima u /tmp direktorijumu.
 *
 * @param {Request} req - HTTP zahtev sa query parametrom `slug`.
 * @returns {Promise<Response>} - XML sadržaj sitemap fajla ili JSON poruka o grešci.
 */

export async function GET(req) {
  try {
    // Parsiranje query parametra `slug` iz URL-a
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return createResponse("Missing `slug` parameter.", 400);
    }

    // Formiranje putanje do traženog fajla u `/tmp` direktorijumu
    const filePath = path.join("/tmp", slug);

    // Ako fajl postoji u `/tmp`, koristi ga
    if (fs.existsSync(filePath)) {
      const sitemap = fs.readFileSync(filePath, "utf-8");
      return createResponse(sitemap, 200, {
        "Content-Type": "application/xml",
        "Cache-Control": "s-maxage=86400, stale-while-revalidate",
      });
    }

    return createResponse("Sitemap file not found.", 404);
  } catch (error) {
    console.error("Error serving sitemap:", error.message);
    return createResponse("Internal server error.", 500);
  }
}
