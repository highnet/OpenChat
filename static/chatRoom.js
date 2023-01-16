var socket = io();
var form = document.getElementById("form");
var input = document.getElementById("input");

let numberOfMessages = 0;
let chatMessages = document.getElementById("chatmessages");

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
  numberOfMessages++;
  console.log(numberOfMessages);

  if (numberOfMessages == 10){
    chatMessages.removeChild(chatMessages.children[0]);
    numberOfMessages--;
    }

});