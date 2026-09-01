// Automatische Weiterleitungen für umbenannte Stücke: Wird im CMS der Titel
// eines Stücks geändert (z. B. „Mephisto“ → „Schachnovelle“), behält die Datei
// ihren alten Namen, die URL folgt aber dem neuen Titel (siehe
// stuecke/stuecke.11tydata.js). Für jedes Stück, dessen Dateiname von der URL
// abweicht, entsteht unter der alten Adresse eine Weiterleitung auf die neue.
export default {
  pagination: {
    data: "collections.stuecke",
    size: 1,
    alias: "stueck",
    before: (stuecke) => stuecke.filter((s) => s.url !== `/die-stuecke/${s.fileSlug}/`),
  },
  eleventyExcludeFromCollections: true,
};
