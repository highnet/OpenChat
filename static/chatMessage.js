"use strict";
function generateChatMessageHTML(msg, other) {
    let component = `
    <div class="container chat-message ${other ? "chat-message-other":"chat-message-mine"}">
        <span class="container chat-message-chat-bubble"></span>
        <p class="container chat-message-chat-nickname">
            ${"RandomUsername6543:"} 
        </p>
        <p class="container chat-message-chat-text">
            ${msg}
        </p>
        </div>`;


    let div = document.createElement("div");
    div.innerHTML = component;
    div.classList.add("chat-element");
    
    return div;
}