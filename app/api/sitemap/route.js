/*
 * API ruta za dinamičko serviranje sitemap fajlova
 *
 * Omogućava pretraživačima (crawler-ima) da pristupe sitemap fajlovima
 * generisanim u `/tmp` direktorijumu. Ako traženi fajl ne postoji, ruta automatski
 * pokreće generisanje svih sitemap fajlova i ponovo pokušava da ga učita.
 */

import fs from "fs";
import path from "path";
import { buildSitemapFile } from "@/app/api/sitemap/buildSitemapFile";

/**
 * GET handler za serviranje sitemap fajlova
 *
 * @param {Request} req - HTTP zahtev sa query parametrom `slug` koji određuje traženi fajl.
 * @returns {Promise<Response>} - XML sadržaj traženog sitemap fajla ili JSON poruka o grešci.
 */

export async function GET(req) {
  try {
    // Parsiranje query parametra `slug` iz URL-a
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response(JSON.stringify({ message: "Missing `slug` parameter." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Formiranje putanje do traženog fajla u `/tmp` direktorijumu
    const filePath = path.join("/tmp", slug);

    // Ako fajl postoji u `/tmp`, koristi ga
    if (fs.existsSync(filePath)) {
      const sitemap = fs.readFileSync(filePath, "utf-8");
      return new Response(sitemap, { status: 200, headers: { "Content-Type": "application/xml" } });
    }

    // Ako fajl ne postoji, generiše sve sitemap fajlove
    console.log("Sitemap file not found. Generating...");
    await buildSitemapFile();

    // Pokušava ponovo da pročita generisani fajl
    if (fs.existsSync(filePath)) {
      const sitemap = fs.readFileSync(filePath, "utf-8");
      return new Response(sitemap, { status: 200, headers: { "Content-Type": "application/xml" } });
    } else {
      return new Response(JSON.stringify({ message: "Sitemap file not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error serving sitemap:", error.message);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
