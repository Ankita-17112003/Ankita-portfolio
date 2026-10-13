# Ankita Batwal portfolio

React + Vite + Tailwind CSS v4 + Motion. All content lives in `src/data/portfolio.js`.

## Run locally
    npm install
    npm run dev

## Production build
    npm run build      # output in dist/
    npm run preview    # test the build locally

## Before you deploy
In `src/data/portfolio.js`: set `contact.email`, `socials`, project `liveUrl` / `sourceUrl` / `image`,
and `resume.enabled = true` after placing the PDF in `public/`.

## Deploy on Vercel
1. Push the project to a GitHub repository (`.gitignore` already excludes node_modules and dist).
2. On vercel.com choose Add New, Project, import the repository.
3. Vercel detects Vite. Build command `npm run build`, output directory `dist`. Click Deploy.
4. Every later `git push` to the main branch redeploys automatically.
5. After the first deploy, add `<link rel="canonical">` and `og:url` with your real URL in `index.html`.

## Custom domain
Vercel project, Settings, Domains, Add. Vercel shows the DNS records to create at your domain provider
(an A record for the root domain, a CNAME for `www`). HTTPS is issued automatically.

## Secrets
The site has no backend and needs no environment variables. If you later add a contact API or admin panel,
keep MongoDB URIs, JWT secrets and email keys on the server only. Never put them in a `VITE_` variable,
because those are bundled into public JavaScript.

## Open Graph image
Add a 1200x630 image at `public/og.png`, then add
`<meta property="og:image" content="https://YOUR-DOMAIN/og.png" />` to `index.html`.
