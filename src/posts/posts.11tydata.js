// Applies to every file in src/posts/. The date comes from the file name: YYYY-MM-DD-slug.md
export default {
  layout: "post.njk",
  tags: ["posts"],
  permalink: (data) => `/${data.page.fileSlug}/`,
};
