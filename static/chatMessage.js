"use strict";
function generateChatMessageHTML(messageData) {
    let other = false;
    let component = `
    <div class="container chat-message ${other ? "chat-message-other":"chat-message-mine"}">
        <span class="container chat-message-chat-bubble"></span>
        <p class="container chat-message-chat-nickname">
            ${messageData.nickname + ':'} 
        </p>
        <p class="container chat-message-chat-text">
            ${messageData.text}
        </p>
        </div>`;


    let div = document.createElement("div");
    div.innerHTML = component;
    div.classList.add("chat-element");
    
    return div;
}