let socket = io();

import { Chatter } from "./chatter.js";

let chatterClient = new Chatter();

messageInputForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let messageData = chatterClient.generateChatMessage(messageInputField.value);

  if (messageData.text != "") {
    socket.emit("chat message", messageData);
    messageInputField.value = "";
    }
});

socket.on("chat message", function (messageData) {
  
  chatMessages.appendChild(generateChatMessageHTML(messageData));
  chatMessages.scrollTop = chatMessages.scrollHeight;
});