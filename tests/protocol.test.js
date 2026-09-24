import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  IFRAME_ORIGIN,
  PARENT_ORIGIN,
  createTextMessage,
  readMessage,
} from "../docs/js/protocol.js";

const source = {};

function incoming(overrides = {}) {
  return {
    isTrusted: true,
    origin: IFRAME_ORIGIN,
    source,
    data: createTextMessage("Hello from the parent"),
    ...overrides,
  };
}

const allowIframe = { allowedOrigin: IFRAME_ORIGIN, expectedSource: source };

test("accepts a trusted text message from the expected window", () => {
  assert.deepEqual(readMessage(incoming(), allowIframe), {
    type: "text",
    text: "Hello from the parent",
  });
});

test("rejects a different origin, an untrusted event, and a different window", () => {
  assert.equal(readMessage(incoming({ origin: "https://evil.example" }), allowIframe), null);
  assert.equal(readMessage(incoming({ isTrusted: false }), allowIframe), null);
  assert.equal(readMessage(incoming({ source: {} }), allowIframe), null);
});

test("rejects malformed payloads and oversized text", () => {
  assert.equal(readMessage(incoming({ data: "<img src=x onerror=alert(1)>" }), allowIframe), null);
  assert.equal(readMessage(incoming({ data: { protocol: "cross-domain-iframe-communication", version: 1, type: "text", text: "  " } }), allowIframe), null);
  assert.equal(
    readMessage(
      incoming({
        data: createTextMessage("x".repeat(501)),
      }),
      allowIframe,
    ),
    null,
  );
});

test("returns markup as text instead of treating it as HTML", () => {
  const text = "<img src=x onerror=alert(1)>";
  assert.deepEqual(readMessage(incoming({ data: createTextMessage(text) }), allowIframe), {
    type: "text",
    text,
  });
});

test("accepts a ready handshake only from the parent origin", () => {
  const parent = {};
  const ready = {
    isTrusted: true,
    origin: PARENT_ORIGIN,
    source: parent,
    data: { protocol: "cross-domain-iframe-communication", version: 1, type: "ready" },
  };
  assert.deepEqual(readMessage(ready, { allowedOrigin: PARENT_ORIGIN, expectedSource: parent }), {
    type: "ready",
  });
  assert.equal(readMessage({ ...ready, origin: IFRAME_ORIGIN }, { allowedOrigin: PARENT_ORIGIN, expectedSource: parent }), null);
});

test("demo scripts never use a wildcard target or innerHTML", () => {
  for (const file of [
    "docs/js/parent.js",
    "docs/js/iframe.js",
    "docs/index.html",
    "docs/iframe.html",
  ]) {
    const contents = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
    assert.equal(contents.includes('"*")'), false, file);
    assert.equal(contents.includes("innerHTML"), false, file);
    assert.equal(contents.includes("attachEvent"), false, file);
  }
});
