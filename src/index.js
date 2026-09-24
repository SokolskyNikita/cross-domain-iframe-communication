import { DEMO_URL } from "../docs/protocol.js";

export default {
  async fetch(request) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { allow: "GET, HEAD" },
      });
    }

    return Response.redirect(DEMO_URL, 302);
  },
};
