import { feedPlugin } from "@11ty/eleventy-plugin-rss";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const toDate = (d) => (d instanceof Date ? d : new Date(d));

export default function (eleventyConfig) {
  // `draft: true` in front matter keeps a page out of the published build.
  // `npm run dev` still shows drafts so you can preview them.
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });

  eleventyConfig.addPassthroughCopy({ "src/css": "css", "src/img": "img" });
  eleventyConfig.addWatchTarget("src/css");

  eleventyConfig.addGlobalData("buildYear", () => new Date().getUTCFullYear());

  // Newest first. Every file in src/posts/ gets the "posts" tag from posts.11tydata.js.
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByTag("posts").sort((a, b) => b.date - a.date)
  );
  // The feed plugin reverses its collection itself, so hand it the oldest-first order.
  eleventyConfig.addCollection("postsAsc", (api) => api.getFilteredByTag("posts"));

  eleventyConfig.addFilter("isoDate", (d) => toDate(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("readableDate", (d) => {
    const x = toDate(d);
    return `${x.getUTCDate()} ${MONTHS[x.getUTCMonth()]} ${x.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "postsAsc", limit: 20 },
    metadata: {
      language: "en",
      title: "Archit Kumar",
      subtitle: "A public log of things I try: ideas, tech projects, startups.",
      base: "https://agarwal29796.github.io/",
      author: { name: "Archit Kumar" },
    },
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
