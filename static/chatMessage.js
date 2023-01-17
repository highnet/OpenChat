"use strict";
function generateChatMessageHTML(msg) {
    let component = `
    <div class="container chat-message chat-message-mine">
        <span class="container chat-message-chat-bubble"></span>
        <p class="container chat-message-chat-nickname">
            ${"RandomUsername6543: "} 
        </p>
        <p class="container chat-message-chat-text">
            ${msg}
        </p>
        </div>`;
    let div = document.createElement("div");
    div.innerHTML = component;
    return div;
}