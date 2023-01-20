import { Chatter } from "./chatter.js";

function convertMessageDataToHTMLComponent(messageData) {
    let other = nicknameInputField.value == messageData.nickname ? false:true;
    let component = `
    <div class="container chat-message ${other ? "chat-message-other":"chat-message-mine"}">
        <span class="container chat-message-chat-bubble"></span>
        <p class="container chat-message-chat-nickname ${other ? "chat-message-chat-nickname-other" : "chat-message-chat-nickname-mine"}">
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

let socket = io();

let chatterClient = new Chatter();

messageInputForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let messageData = chatterClient.generateMessageData(messageInputField.value);

  if (messageData.text != "") {
    socket.emit("chat message", messageData);
    messageInputField.value = "";
    }
});

socket.on("chat message", function (messageData) {
  chatMessages.appendChild(convertMessageDataToHTMLComponent(messageData));
  chatMessages.scrollTop = chatMessages.scrollHeight;
});