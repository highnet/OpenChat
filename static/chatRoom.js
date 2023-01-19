let socket = io();
let messageInputForm = document.getElementById("messageInput");
let messageInputField = document.getElementById("messageInputField");
let nicknameInputField = document.getElementById("nicknameInputField");
let chatMessages = document.getElementById("chatmessages");
import { MessageData } from "./messageData.js";
import { Chatter } from "./chatter.js";

let chatterMe = new Chatter();

messageInputForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let messageData = new MessageData(
    messageInputField.value, 
    nicknameInputField.value
    );

  if (messageData.text != "") {
    socket.emit("chat message", messageData);
    messageInputField.value = "";
    }
});

socket.on("chat message", function (messageData) {
  
  chatMessages.appendChild(generateChatMessageHTML(messageData));
  chatMessages.scrollTop = chatMessages.scrollHeight;
});