# AGENTS.md

## What this is

`mccarrison.me/games` — a static "retro game portal" landing page (Newgrounds/Kongregate homage) that links out to the other browser games hosted on this domain. Each game (Ski Free, Mini Golf, Worms, Snek, Fish Tank) is its own separate repo/Worker with its own route; this repo only owns the portal page itself.

**Important:** the stats on the page (users online, play counts, leaderboard, "Recent Activity" feed, visitor counter) are all hardcoded in `index.html` — there is no backend, no database, no real tracking. It's set dressing, not live data.

## Structure

- `index.html` — the entire portal page (game grid, sidebar, footer)
- `style.css` — all styling
- `worker/src/index.js` — Cloudflare Worker that serves the static assets at `/games` and `/games/*`, and 301-redirects bare `/games` to `/games/`
- `worker/wrangler.toml` — binds routes `mccarrison.me/games` and `mccarrison.me/games/*`, serves `../` (repo root) as static assets
- `deploy.sh` — deploys to production; **refuses to run from any branch except `main`**

## Adding a new game to the grid

1. Add a `.game-card` block to `index.html` (copy an existing one — thumb art, title, meta, tags, `/path` link)
2. Add it to the sidebar `Top Rated` list and bump the `Games` / `Categories` counts if desired
3. These are just static links — the actual game lives in its own repo with its own Cloudflare route. This repo doesn't need to know anything about how that game works.

## Deploy

```bash
./deploy.sh   # must be on main; runs `npx wrangler deploy` from worker/
```

Live at `https://mccarrison.me/games/`.
