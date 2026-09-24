# Two-way cross-domain iframe communication

A parent page and an iframe on a different origin exchange text messages with [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

The live demo needs nothing installed. The parent is GitHub Pages. The iframe is a Cloudflare Worker on another origin.

**[Open the demo](https://sokolskynikita.github.io/cross-domain-iframe-communication/)**

| Side | Origin |
| --- | --- |
| Parent | `https://sokolskynikita.github.io` |
| Iframe | `https://cross-domain-iframe.sokolx.workers.dev` |

Forked from [pbojinov/iframe-communication](https://github.com/pbojinov/iframe-communication), which only showed one origin.

## How a message gets across

The parent sends with `iframe.contentWindow.postMessage(message, iframeOrigin)`.

The iframe sends with `window.parent.postMessage(message, parentOrigin)`.

Both sides listen with `window.addEventListener("message", ...)`. A message is shown only when all of these are true:

- The browser marked the event trusted.
- `event.origin` is the one expected peer.
- `event.source` is that peer's window.
- The payload is `{ protocol, version, type, text }` with a short string.

Received text is inserted with `textContent`. The target origin is never `*`.

## Layout

GitHub Pages publishes the [`docs/`](docs/) directory. The Worker serves that same directory and redirects its own homepage to the demo above.

```
docs/index.html     parent page
docs/iframe.html    framed page
docs/protocol.js    message format and checks
src/index.js        Worker redirect
```

## Deploy the iframe

The Worker is already deployed. To publish a change to the iframe:

```bash
npm run deploy:iframe
```

GitHub Pages publishes `docs/` from `master` when that commit is pushed. Both hosts must agree on the origins in `docs/protocol.js`.

## Tests

```bash
node --test
```

## License

MIT
