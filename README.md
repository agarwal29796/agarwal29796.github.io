# agarwal29796.github.io

Archit Kumar's public log of things tried: ideas, tech projects, startups. Live at https://agarwal29796.github.io

## Write a post

Create `src/posts/YYYY-MM-DD-slug.md`. The date in the file name is the publish date; the slug is the URL.

```md
---
title: Thing I tried
description: One sentence. Shown in the list and used by search engines.
status: trying          # trying | shipped | paused | dropped | idea
tags: [ar, startup]     # optional
link: https://example.com   # optional, shown under the title
linkText: example.com       # optional label for the link
updated: 2026-10-01     # optional, set it when you edit a page later
draft: true             # optional, keeps the page out of the published site
---

Body in Markdown.
```

Push to `main`. GitHub Actions builds and deploys in about a minute.

## Run locally

```sh
nvm use          # Node 22, see .nvmrc
npm ci
npm run dev      # http://localhost:8080, drafts visible
npm run build    # writes _site/
```

## Layout

- `src/posts/` one file per thing
- `src/index.njk` home page, `src/about.md`, `src/now.md`
- `src/_includes/base.njk` head, SEO tags, JSON-LD, header, footer; `post.njk` post layout and comments
- `src/_data/site.json` name, links, giscus ids
- `src/sitemap.njk`, `src/robots.njk`, feed from `@11ty/eleventy-plugin-rss`
- `legacy/` 2022 notebooks, kept for future posts, not published

## Comments

giscus on GitHub Discussions, category "Announcements". The giscus app must be installed on this repo: https://github.com/apps/giscus
