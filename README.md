# Two-way cross-domain iframe communication

A parent page and an iframe on a different origin exchange text messages with [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

**[Open the demo](https://sokolskynikita.github.io/cross-domain-iframe-communication/)**

| Side | Origin |
| --- | --- |
| Parent | `https://sokolskynikita.github.io` |
| Iframe | `https://cross-domain-iframe.sokolx.workers.dev` |

GitHub Pages publishes `docs/`. The parent is `docs/index.html`. The framed page is `docs/iframe.html`. Scripts are in `docs/js/`, styles in `docs/css/`. The Worker serves the iframe files from those same paths. `src/index.js` redirects the Worker homepage to the demo.

The parent sends with `iframe.contentWindow.postMessage(message, iframeOrigin)`. The iframe sends with `window.parent.postMessage(message, parentOrigin)`. A message is shown only when the event is trusted, the origin and window are the expected peer, and the payload is a short string. Received text is inserted with `textContent`.

Forked from [pbojinov/iframe-communication](https://github.com/pbojinov/iframe-communication).

```bash
node --test
npm run deploy:iframe
```
