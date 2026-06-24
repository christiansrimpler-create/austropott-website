import yaml from "js-yaml";
import MarkdownIt from "markdown-it";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const md = new MarkdownIt({ html: true, typographer: false });

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));

  // Cache-Busting: Hash über den CSS-Inhalt, ändert sich nur bei echten Änderungen
  eleventyConfig.addGlobalData("cssVersion", () => {
    try {
      return createHash("md5")
        .update(readFileSync("src/assets/css/style.css"))
        .digest("hex")
        .slice(0, 8);
    } catch {
      return "";
    }
  });

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.ignores.add("src/admin/**");

  eleventyConfig.addFilter("md", (value) => md.render(value || ""));
  eleventyConfig.addFilter("mdInline", (value) => md.renderInline(value || ""));

  // YAML liefert Datumswerte je nach Schreibweise als Date-Objekt oder String
  const isoDatum = (d) =>
    d instanceof Date ? d.toISOString().slice(0, 10) : String(d).slice(0, 10);
  const alsDate = (d) => new Date(isoDatum(d) + "T12:00:00");

  // Nur Termine ab heute (vergangene verschwinden beim nächsten Build automatisch)
  eleventyConfig.addFilter("zukuenftige", (termine) => {
    const heute = new Date().toISOString().slice(0, 10);
    return (termine || [])
      .filter((t) => isoDatum(t.datum) >= heute)
      .sort((a, b) => isoDatum(a.datum).localeCompare(isoDatum(b.datum)));
  });

  // [{monat: "September 2026", termine: [...]}, ...] in chronologischer Reihenfolge
  eleventyConfig.addFilter("nachMonat", (termine) => {
    const gruppen = [];
    for (const t of termine || []) {
      const monat = alsDate(t.datum).toLocaleDateString("de-DE", { month: "long", year: "numeric" });
      let gruppe = gruppen.find((g) => g.monat === monat);
      if (!gruppe) gruppen.push((gruppe = { monat, termine: [] }));
      gruppe.termine.push(t);
    }
    return gruppen;
  });

  // "2026-09-19" -> "SA 19."
  eleventyConfig.addFilter("wochentag", (datum) => {
    const d = alsDate(datum);
    const tag = d.toLocaleDateString("de-DE", { weekday: "short" }).replace(".", "").toUpperCase();
    return `${tag} ${d.getDate()}.`;
  });

  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  // Findet zur Stück-Angabe eines Termins die passende Detailseite
  eleventyConfig.addFilter("stueckUrl", (titel, stuecke) => {
    const s = (stuecke || []).find((x) => x.data.titel === titel);
    return s ? s.url : null;
  });

  eleventyConfig.addCollection("stuecke", (api) =>
    api
      .getFilteredByGlob("src/stuecke/*.md")
      .sort((a, b) => (a.data.reihenfolge || 99) - (b.data.reihenfolge || 99))
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    pathPrefix: process.env.PATH_PREFIX || "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
