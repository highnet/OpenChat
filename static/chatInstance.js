var socket = io();
var form = document.getElementById("form");
var input = document.getElementById("input");

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
  chatmessages.appendChild(generate(msg));
});