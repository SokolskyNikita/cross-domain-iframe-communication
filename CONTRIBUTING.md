# Contributing

Issues and pull requests are welcome.

The demo visitors use is the GitHub Pages site. The iframe is the Cloudflare Worker described in the README. A change to either page has to keep the origins in `docs/protocol.js` in sync, then ship both places:

1. `node --test`
2. `npm run deploy:iframe` for the iframe
3. Push to `master` so GitHub Pages republishes `docs/`
