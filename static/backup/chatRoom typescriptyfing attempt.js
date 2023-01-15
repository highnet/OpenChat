"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)();
const form = document.getElementById("form");
var input = document.getElementById("input");
const chatMessages = document.getElementById("chatmessages");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", input.value);
        input.value = "";
    }
});
socket.on("chat message", function (msg) {
    window.scrollTo(0, document.body.scrollHeight);
    var message = document.createElement("div");
    chatMessages.appendChild(generateChatMessageHTML(msg));
});
function generateChatMessageHTML(msg) {
    let component = `
    <div class="chat-message grid grid-1x2">
        <span class="chat-bubble"></span>
        <p class="chat-text">
            ${msg}
        </p>
        </div>`;
    let div = document.createElement("div");
    div.innerHTML = component;
    return div;
}
