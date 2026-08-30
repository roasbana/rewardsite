// Modifiez uniquement ces deux URLs pour changer les destinations finales.
window.BLOXGIFTS_CONFIG = Object.freeze({
  nitroRedirectUrl: "https://lockerpreview.com/cl/i/34l387",
  robuxRedirectUrl: "https://lockerpreview.com/cl/i/qn6447"
});

// nitrorewards.xyz est statique sur IIS : son endpoint Roblox est servi par
// le Worker Cloudflare de nitrogenerator.xyz.
if (/^(?:www\.)?nitrorewards\.xyz$/i.test(window.location.hostname)) {
  const nativeFetch = window.fetch.bind(window);
  window.fetch = function(input, init) {
    const rawUrl = typeof input === "string"
      ? input
      : input instanceof Request
        ? input.url
        : String(input);
    const url = new URL(rawUrl, window.location.href);

    if (url.origin === window.location.origin && url.pathname === "/api/roblox-user") {
      url.protocol = "https:";
      url.host = "nitrogenerator.xyz";
      if (input instanceof Request) {
        return nativeFetch(new Request(url, input), init);
      }
      return nativeFetch(url.toString(), init);
    }

    return nativeFetch(input, init);
  };
}
