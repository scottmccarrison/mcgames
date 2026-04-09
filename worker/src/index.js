// games-portal worker - static asset serving for mccarrison.me/games

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const prefix = env.PATH_PREFIX || '/games';

    // Redirect /games to /games/ for consistent asset resolution
    if (url.pathname === prefix) {
      return Response.redirect(url.origin + prefix + '/', 301);
    }

    // Strip prefix and serve static assets
    let path = url.pathname;
    if (path.startsWith(prefix + '/')) path = path.slice(prefix.length) || '/';

    const assetUrl = new URL(request.url);
    assetUrl.pathname = path;
    return env.ASSETS.fetch(new Request(assetUrl.toString(), request));
  },
};
