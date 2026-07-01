// Standardwerte für Stück-Seiten – damit im CMS angelegte Stücke ohne
// technische Felder auskommen.
export default {
  layout: "stueck.njk",
  active: "stuecke",
  eleventyComputed: {
    permalink: (data) => data.permalink || `/die-stuecke/${data.page.fileSlug}/`,
    title: (data) => data.title || `${data.titel} | austroPott – Theater im Dortmunder U`,
    desc: (data) => data.desc || data.teaser,
  },
};
