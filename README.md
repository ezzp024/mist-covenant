# Mist Covenant (Prototype)

Original browser-based multiplayer turn-strategy prototype with Hebrew-first UX and language switcher (`he`, `en`, `ru`).

## Included page flow

`Landing Page -> Register/Login -> Character Creation -> Faction Selection -> Clan Setup -> Main Dashboard -> Turn Actions -> Social/Clan Systems -> Progression Screens`

## Files

- `index.html` - main app shell and screen flow
- `styles.css` - responsive UI styles
- `app.js` - game logic, i18n, onboarding tips, backend integration
- `config.js` - runtime backend configuration (safe public values only)
- `config.example.js` - template for configuration
- `supabase-schema.sql` - SQL to create shared multiplayer tables
- `.github/workflows/pages.yml` - auto deploy workflow to GitHub Pages
- `.nojekyll` - disables Jekyll processing for static assets
- `404.html` - fallback redirect for Pages
- `CNAME.example` - template for optional custom domain

## Local run

Open `index.html` in a browser.

## Shared multiplayer (free Supabase)

1. Create a free Supabase project.
2. Open SQL Editor and run `supabase-schema.sql`.
3. In Supabase project settings, copy:
   - Project URL
   - Anon public key
4. Put them in `config.js`, or open the in-game **Server** panel and paste them there.

Example `config.js`:

```js
window.GAME_CONFIG = {
  supabaseUrl: "https://your-project.supabase.co",
  supabaseAnonKey: "your-public-anon-key",
};
```

Notes:
- This uses only anon public credentials (safe for frontend usage).
- If no backend is configured, the app automatically falls back to local simulation.

## Deploy to GitHub Pages

### Option A (recommended): GitHub Actions (already configured)

1. Push this folder to a GitHub repo on branch `main`.
2. In repo settings -> Pages -> Build and deployment, choose **GitHub Actions**.
3. Push again (or run workflow manually) and wait for deploy.

Site URL:

`https://<your-username>.github.io/<repo-name>/`

### Option B: Deploy from branch root

1. In Pages settings choose **Deploy from a branch**.
2. Select `main` and `/ (root)`.
3. Save.

## Optional custom domain

1. Copy `CNAME.example` to `CNAME` and replace with your domain (for example `game.example.com`).
2. In your DNS provider, add a `CNAME` record from your subdomain to:

`<your-username>.github.io`

3. In GitHub Pages settings, set the same custom domain.
4. Enable HTTPS in Pages settings.

## Current scope

- Personal profile and progression data in browser local storage.
- Shared live leaderboard/feed via Supabase when configured.
- Onboarding tooltip hints across main screens.
