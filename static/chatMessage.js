"use strict";
function generateChatMessageHTML(msg) {
    let component = `
    <div class="container grid grid-1x2 chat-message">
        <span class="container chat-message-chat-bubble"></span>
        <p class="container chat-message-chat-nickname">
            ${"Joaquin: "} 
        </p>
        <p class="container chat-message-chat-text">
            ${msg}
        </p>
        </div>`;
    let div = document.createElement("div");
    div.innerHTML = component;
    return div;
}