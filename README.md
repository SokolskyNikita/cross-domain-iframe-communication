# Two-way cross-domain iframe communication

A parent page and an iframe on a different origin exchange text messages with [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

**[Open the demo](https://sokolskynikita.github.io/cross-domain-iframe-communication/)**

| Side | Origin |
| --- | --- |
| Parent | `https://sokolskynikita.github.io` |
| Iframe | `https://cross-domain-iframe.sokolx.workers.dev` |

`index.html` is the parent page. `iframe.html` is the framed page. The Worker serves `iframe.html`, `iframe.js`, `protocol.js`, and `demo.css` from this folder. `src/index.js` redirects the Worker homepage to the demo.

The parent sends with `iframe.contentWindow.postMessage(message, iframeOrigin)`. The iframe sends with `window.parent.postMessage(message, parentOrigin)`. A message is shown only when the event is trusted, the origin and window are the expected peer, and the payload is a short string. Received text is inserted with `textContent`.

Forked from [pbojinov/iframe-communication](https://github.com/pbojinov/iframe-communication).

```bash
node --test
npm run deploy:iframe
```
