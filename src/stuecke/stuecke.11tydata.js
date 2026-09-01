// Standardwerte für Stück-Seiten – damit im CMS angelegte Stücke ohne
// technische Felder auskommen.
//
// URL, Seitentitel und Meta-Beschreibung werden IMMER aus den CMS-Feldern
// (Titel, Einleitungstext) berechnet. Altfelder wie permalink/title/desc, die
// noch in einer Datei stehen, werden bewusst ignoriert – das CMS hat sie
// früher beim Speichern wieder hineingeschrieben und so veraltete URLs erzeugt.
//
// Die URL folgt dem Titel, nicht dem Dateinamen: Sveltia benennt die Datei
// beim Ändern des Titels nicht um (mephisto.md wurde zu „Schachnovelle“).
// Weicht der Dateiname von der URL ab, erzeugt stueck-weiterleitungen.njk
// automatisch eine Weiterleitung von der alten Adresse auf die neue.

const slug = (text) =>
  String(text || "")
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default {
  layout: "stueck.njk",
  active: "stuecke",
  eleventyComputed: {
    permalink: (data) => `/die-stuecke/${slug(data.titel) || data.page.fileSlug}/`,
    title: (data) => `${data.titel} | austroPott – Theater im Dortmunder U`,
    desc: (data) => data.teaser,
  },
};
