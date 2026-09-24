# Security policy

## Reporting a vulnerability

[Open a private security advisory](https://github.com/SokolskyNikita/cross-domain-iframe-communication/security/advisories/new).

## What the demo trusts

The parent origin and the iframe origin are fixed in `docs/protocol.js`. Each page accepts messages only from the other origin, and only from that other window. Payloads must use the versioned text format. Message text is written into the page as text, not HTML.

`postMessage` is always called with that exact target origin. The framed page also sends `Content-Security-Policy: frame-ancestors https://sokolskynikita.github.io`, so other sites cannot embed it.
