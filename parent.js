import {
  IFRAME_ORIGIN,
  IFRAME_URL,
  createReadyMessage,
  createTextMessage,
  readMessage,
} from "./protocol.js";

const iframe = document.querySelector("#child");
const status = document.querySelector("#status");
const log = document.querySelector("#log");
const form = document.querySelector("#send-form");
const input = document.querySelector("#message");
const button = document.querySelector("#send");

document.querySelector("#self-origin").textContent = location.origin;
document.querySelector("#peer-origin").textContent = IFRAME_ORIGIN;

window.addEventListener("message", (event) => {
  const message = readMessage(event, {
    allowedOrigin: IFRAME_ORIGIN,
    expectedSource: iframe.contentWindow,
  });
  if (!message) return;

  if (message.type === "ready") {
    status.textContent = `Connected to ${new URL(IFRAME_ORIGIN).host}`;
    button.disabled = false;
    iframe.contentWindow.postMessage(createReadyMessage(), IFRAME_ORIGIN);
    return;
  }

  appendLog(log, message.text);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text || button.disabled) return;
  iframe.contentWindow.postMessage(createTextMessage(text), IFRAME_ORIGIN);
});

iframe.src = IFRAME_URL;

function appendLog(list, text) {
  list.querySelector(".empty")?.remove();
  const item = document.createElement("li");
  item.textContent = text;
  list.append(item);
  while (list.children.length > 50) list.firstElementChild.remove();
}
