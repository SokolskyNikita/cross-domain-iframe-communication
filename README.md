# Two way cross domain iframe communication

Seamless communication between a parent page on one domain and an iframe on a different domain. It relies on [window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) and works in IE11 and all modern browsers.

Forked from [@pbojinov's work](https://github.com/pbojinov/iframe-communication) originally, as it only had a single domain example.

## Demo

[https://sokolskynikita.github.io/cross-domain-iframe-communication/](https://sokolskynikita.github.io/cross-domain-iframe-communication/)

The main difference between the code in the two pages (parent and iframe) is the method of sending messages. Receiving messages is done using the same code.

### parent

Send message to iframe using `iframeEl.contentWindow.postMessage`

Recieve message using `window.addEventListener('message')`

### iframe

Send message to parent window using `window.parent.postMessage`

Recieve message using `window.addEventListener('message')`

## License

MIT
