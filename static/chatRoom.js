import { Chatter } from "./chatter.js";
let socket = io();

let chatterClient = "";

function appendToChatMessagesNewHTMLComponentFromMessageData(messageData) {
    let messageBelongsToClient = messageData.uuid == chatterClient.uuid ? false : true;
    let component = `
    <div class="container chat-message ${messageBelongsToClient ? "chat-message-other":"chat-message-mine"}">
        <span class="container chat-message-chat-bubble"></span>
        <p class="container chat-message-chat-nickname ${messageBelongsToClient ? "chat-message-chat-nickname-other" : "chat-message-chat-nickname-mine"}">
            ${messageData.uuid + ':'} 
        </p>
        <p class="container chat-message-chat-text">
            ${messageData.text}
        </p>
        </div>`;

    let div = document.createElement("div");
    div.innerHTML = component;
    div.classList.add("chat-element");
    
   chatMessages.appendChild(div);
}

function generateNewChatClientsListHTMLComponentFromClientsList(clients){
    while( chatClientsList.firstChild ){
        chatClientsList.removeChild( chatClientsList.firstChild );
    }
    for(let client of clients){
        let listItem = document.createElement('li');
        listItem.innerText = client;
        if (chatterClient.uuid == client){
            listItem.innerText += "(You)";
        }
        chatClientsList.appendChild(listItem);
    }
}

messageInputForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let messageData = chatterClient.generateMessageData(messageInputField.value);

  if (messageData.text != "") {
    socket.emit("chat message", messageData);
    messageInputField.value = "";
    }
});

socket.on("chat message", function (messageData) {
  appendToChatMessagesNewHTMLComponentFromMessageData(messageData);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


socket.on("a client logged in", function (clients) {
    console.log("a client logged in");
    generateNewChatClientsListHTMLComponentFromClientsList(clients);
});

socket.on("a client logged out", function (clients) {
    console.log("a client logged out");
    generateNewChatClientsListHTMLComponentFromClientsList(clients);

});

socket.on("you logged in", function (uuidv4, clients) {
    console.log("you logged in");
    chatterClient = new Chatter(uuidv4);
    generateNewChatClientsListHTMLComponentFromClientsList(clients);
});
