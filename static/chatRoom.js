let socket = io();
let messageInputForm = document.getElementById("messageInput");
let messageInputField = document.getElementById("messageInputField");
let nicknameInputField = document.getElementById("nicknameInputField");

let numberOfMessages = 0;
let chatMessages = document.getElementById("chatmessages");

messageInputForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let messageData = {
    text: messageInputField.value,
    nickname: nicknameInputField.value
  };

  if (messageData.text != "") {
    socket.emit("chat message", messageData);
    messageInputField.value = "";
    }
});

socket.on("chat message", function (messageData) {
  let message = document.createElement("div");
  chatMessages.appendChild(generateChatMessageHTML(messageData));
  numberOfMessages++;
  chatMessages.scrollTop = chatMessages.scrollHeight;
  if (numberOfMessages == 25){
    chatMessages.removeChild(chatMessages.children[0]);
    numberOfMessages--;
  }

});