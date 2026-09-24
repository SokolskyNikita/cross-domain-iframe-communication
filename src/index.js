import demoCss from "../docs/css/demo.css";
import iframeHtml from "../docs/iframe.html";
import iframeJs from "../docs/js/iframe.js";
import protocolJs from "../docs/js/protocol.js";

const DEMO_URL =
  "https://sokolskynikita.github.io/cross-domain-iframe-communication/";

const files = {
  "/iframe.html": {
    body: iframeHtml,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "content-security-policy":
        "frame-ancestors https://sokolskynikita.github.io",
      "referrer-policy": "no-referrer",
      "x-content-type-options": "nosniff",
    },
  },
  "/js/iframe.js": {
    body: iframeJs,
    headers: { "content-type": "text/javascript; charset=utf-8" },
  },
  "/js/protocol.js": {
    body: protocolJs,
    headers: { "content-type": "text/javascript; charset=utf-8" },
  },
  "/css/demo.css": {
    body: demoCss,
    headers: { "content-type": "text/css; charset=utf-8" },
  },
};

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);

    if (pathname === "/" || pathname === "/index.html") {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Method not allowed", {
          status: 405,
          headers: { allow: "GET, HEAD" },
        });
      }
      return Response.redirect(DEMO_URL, 302);
    }

    const file = files[pathname];
    if (!file || (request.method !== "GET" && request.method !== "HEAD")) {
      return new Response(file ? "Method not allowed" : "Not found", {
        status: file ? 405 : 404,
        headers: file ? { allow: "GET, HEAD" } : undefined,
      });
    }

    return new Response(request.method === "HEAD" ? null : file.body, {
      headers: file.headers,
    });
  },
};
