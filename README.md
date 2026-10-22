# Kuba.rocks

Personal website built with Next.js, React, Tailwind CSS, and MDX. The contact
form sends email through Postmark. Content lives in `src`, `data`, and `content`.

## Run locally

1. Install Node.js 24.22.1, as specified in `.node-version`.
2. Enable Corepack with `corepack enable`. If your Node installation does not
   include Corepack, install it with `npm install --global corepack` first.
   Corepack uses the pnpm version pinned in `package.json`.
3. Run `pnpm install --frozen-lockfile`.
4. Copy `.env.example` to `.env.local` and fill in the email settings if you
   want to send contact messages:

   ```sh
	cp .env.example .env.local
   ```

5. Run `pnpm dev` and open [localhost:3000](http://localhost:3000).

The site builds without environment variables. Sending contact messages requires
`POSTMARK_SERVER_TOKEN`, `MAIL_FROM`, and `MAIL_TO`. Use a sender verified in
Postmark for `MAIL_FROM`. Keep these values in local environment files or your
hosting provider's secret settings.

`NEXT_PUBLIC_GOOGLE_MAPS_KEY` is optional. Leave it empty to hide the map. This
key is public in the browser bundle, so restrict it to your domains and the Maps
JavaScript API. Set it before building.

## Check changes

Run these checks before submitting changes:

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm audit --prod
pnpm build
```

Browser tests run with Playwright against the production build. Install
Chromium once, build, then run them; Playwright starts `next start` on port 3100:

```sh
pnpm exec playwright install chromium
pnpm build
pnpm test:e2e
```

They cover the theme switch, page errors, 320px layouts in both themes, contact
form validation, and the search and share files listed below.

`pnpm typecheck` generates Next.js route types before checking TypeScript.
The email regression tests use Node's built-in test runner and mock Postmark's
HTTP transport. They do not send email or load local environment files.
The build downloads Barlow, Barlow Condensed, and Chivo Mono from Google Fonts,
so it needs internet access. Big Shoulders is bundled locally so Next.js can
calculate fallback metrics from the font file without its missing-metrics warning.

GitHub Actions runs these checks for pull requests and pushes to `main`.
It also audits development dependencies with the exception below. No production
credentials are needed in CI. To run the production build locally, run
`pnpm build` followed by `pnpm start`.

## Search and sharing

- `src/app/opengraph-image.tsx` draws the link preview image. It uses static
  font cuts described in `src/app/fonts/README.md`.
- `src/app/sitemap.ts` and `src/app/robots.ts` serve `/sitemap.xml` and `/robots.txt`.
- `src/components/layout/structured-data.tsx` adds schema.org Person data.
- `src/app/llms.txt/route.ts` serves `/llms.txt`, the site in Markdown for
  language models, built from the files in `data`.
- Page titles, descriptions and canonical URLs come from `pageMetadata` in
  `src/lib/site.ts`.

## Maintain dependencies

`renovate.json` configures weekly npm and GitHub Actions update pull requests,
including lockfile maintenance. Enable the
[Renovate GitHub app](https://github.com/apps/renovate) for this repository and
merge the configuration into the default branch to start the bot. Next.js,
React, and Tailwind packages are grouped with their related packages so updates
can be reviewed together. New releases wait three days before updates are opened.

Renovate is used because
[Dependabot's documented pnpm support](https://docs.github.com/en/code-security/reference/supply-chain-security/supported-ecosystems-and-repositories)
stops at pnpm 10, while this project uses pnpm 12.

TypeScript stays at 5.9.3 because the installed `typescript-eslint` parser supports
TypeScript versions below 6.1. Review parser support before enabling TypeScript
major updates. Node types stay on 24.x to match the runtime. Update the runtime,
types, `engines`, and Renovate rule together when moving to another Node major.

Node.js 24.22.1 is the minimum supported release because it fixes
[CVE-2026-111497](https://nodejs.org/en/blog/release/v24.22.1/) and the other
October 2026 Node.js security issues. CI uses the version in `.node-version`.
Vercel selects Node.js 24.x from `engines.node` and manages its patch version.

ESLint 10 runs with the current Next.js configuration, but `eslint-plugin-import`,
`eslint-plugin-jsx-a11y`, and `eslint-plugin-react` still declare peer support only
through ESLint 9. Installs report these warnings. Lint and build checks pass.

Check the full audit periodically:

```sh
pnpm outdated
pnpm audit
```

As of 2026-10-16, `pnpm audit` reports
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)
in `braces@3.0.3`. It is a stack-exhaustion denial of service triggered by deeply
nested brace patterns. The dependency path is
`eslint-config-next > @next/eslint-plugin-next > fast-glob > micromatch > braces`.
This path is used by lint tooling, and the production audit is clean. No patched
version is published. CI excludes only this advisory from the full audit. Local
`pnpm audit` still reports it. Remove the exception in `.github/workflows/ci.yml`
and refresh the lockfile when a fix is available.

If an update breaks the site, revert its commit, run
`pnpm install --frozen-lockfile`, and rerun the checks before redeploying.
