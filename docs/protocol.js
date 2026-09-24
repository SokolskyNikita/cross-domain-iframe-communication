export const PROTOCOL = "cross-domain-iframe-communication";
export const VERSION = 1;
export const MAX_TEXT_LENGTH = 500;

export const PARENT_ORIGIN = "https://sokolskynikita.github.io";
export const IFRAME_ORIGIN = "https://cross-domain-iframe.sokolx.workers.dev";
export const IFRAME_URL = `${IFRAME_ORIGIN}/iframe.html`;
export const DEMO_URL =
  "https://sokolskynikita.github.io/cross-domain-iframe-communication/";

export function createTextMessage(text) {
  return {
    protocol: PROTOCOL,
    version: VERSION,
    type: "text",
    text,
  };
}

export function createReadyMessage() {
  return {
    protocol: PROTOCOL,
    version: VERSION,
    type: "ready",
  };
}

export function readMessage(event, { allowedOrigin, expectedSource }) {
  if (!event.isTrusted) return null;
  if (event.origin !== allowedOrigin) return null;
  if (event.source !== expectedSource) return null;

  const data = event.data;
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  if (data.protocol !== PROTOCOL || data.version !== VERSION) return null;

  if (data.type === "ready") return { type: "ready" };

  if (data.type !== "text" || typeof data.text !== "string") return null;
  const text = data.text.trim();
  if (!text || text.length > MAX_TEXT_LENGTH) return null;
  return { type: "text", text };
}
