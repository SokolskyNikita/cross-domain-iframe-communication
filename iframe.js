import {
  PARENT_ORIGIN,
  createReadyMessage,
  createTextMessage,
  readMessage,
} from "./protocol.js";

const status = document.querySelector("#status");
const log = document.querySelector("#log");
const form = document.querySelector("#send-form");
const input = document.querySelector("#message");
const button = document.querySelector("#send");
const embedded = window.parent !== window;

document.querySelector("#self-origin").textContent = location.origin;
document.querySelector("#peer-origin").textContent = embedded
  ? PARENT_ORIGIN
  : "not embedded";

if (!embedded) {
  status.textContent = "Open the parent demo to talk to this frame";
  button.disabled = true;
  input.disabled = true;
} else {
  window.parent.postMessage(createReadyMessage(), PARENT_ORIGIN);
}

window.addEventListener("message", (event) => {
  const message = readMessage(event, {
    allowedOrigin: PARENT_ORIGIN,
    expectedSource: window.parent,
  });
  if (!message) return;

  if (message.type === "ready") {
    status.textContent = `Connected to ${new URL(PARENT_ORIGIN).host}`;
    button.disabled = false;
    return;
  }

  appendLog(log, message.text);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text || button.disabled) return;
  window.parent.postMessage(createTextMessage(text), PARENT_ORIGIN);
});

function appendLog(list, text) {
  list.querySelector(".empty")?.remove();
  const item = document.createElement("li");
  item.textContent = text;
  list.append(item);
  while (list.children.length > 50) list.firstElementChild.remove();
}
