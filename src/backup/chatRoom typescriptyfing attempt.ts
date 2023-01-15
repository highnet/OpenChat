import { io } from "socket.io-client";

const socket = io();

const form = document.getElementById("form") as HTMLFormElement;
var input = document.getElementById("input") as HTMLInputElement;
const chatMessages = document.getElementById("chatmessages") as HTMLDivElement;

form.addEventListener("submit", function (e: Event) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
    }
});

socket.on("chat message", function (msg:string) {
  window.scrollTo(0, document.body.scrollHeight);
  var message = document.createElement("div");
  chatMessages.appendChild(generateChatMessageHTML(msg));
});

 function generateChatMessageHTML(msg: string){
    let component = `
    <div class="chat-message grid grid-1x2">
        <span class="chat-bubble"></span>
        <p class="chat-text">
            ${msg}
        </p>
        </div>`;
    let div = document.createElement("div");
    div.innerHTML = component;
    return div;    
  }