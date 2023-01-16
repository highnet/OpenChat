var socket = io();
var messageInputForm = document.getElementById("messageInput");
var messageInputField = document.getElementById("messageInputField");

let numberOfMessages = 0;
let chatMessages = document.getElementById("chatmessages");

messageInputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (messageInputField.value) { /*<- send msg here */
    socket.emit("chat message", messageInputField.value);
    messageInputField.value = "";
    }
});

socket.on("chat message", function (msg) {
  var message = document.createElement("div");
  chatMessages.appendChild(generateChatMessageHTML(msg));
  numberOfMessages++;
  chatMessages.scrollTop = chatMessages.scrollHeight;
  if (numberOfMessages == 25){
    chatMessages.removeChild(chatMessages.children[0]);
    numberOfMessages--;
  }

});