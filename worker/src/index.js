// games-portal worker - static asset serving for mccarrison.me/games
// No API routes needed; the ASSETS binding handles all static files.

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const prefix = env.PATH_PREFIX || '/games';

    // Redirect /games to /games/ for consistent asset resolution
    if (url.pathname === prefix) {
      return Response.redirect(url.origin + prefix + '/', 301);
    }

    // Everything else is handled by the ASSETS binding automatically
  },
};
