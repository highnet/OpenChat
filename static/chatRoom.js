import { Chatter } from "./chatter.js";
let socket = io();

let chatterClient = "";

function appendToChatMessagesNewHTMLComponentFromMessageData(messageData) {
    let messageBelongsToClient = messageData.uuid == chatterClient.uuid ? false : true;
    let component = `
    <div class="container chat-message ${messageBelongsToClient ? "chat-message-other":"chat-message-mine"}">
        <span class="container chat-message-chat-bubble"></span>
        <p class="container chat-message-chat-nickname ${messageBelongsToClient ? "chat-message-chat-nickname-other" : "chat-message-chat-nickname-mine"}">
            ${messageData.nickname + ':'} 
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

function appendToNewChatClientsListHTMLComponentsFromClientsList(chatters){
    console.log(chatters._Uuids);
    console.log(chatters._Nicknames);


    while( chatClientsList.firstChild ){
        chatClientsList.removeChild( chatClientsList.firstChild );
    }
    let i = 0;
    for(let userID of chatters._Uuids){
        let listItem = document.createElement('li');
        let paragraph = document.createElement('p');
        if (chatterClient.uuid == userID){
            paragraph.appendChild(document.createTextNode(chatters._Nicknames[i] + " (You)"));
            paragraph.classList.add("chat-clients-toolbar-clients-list-username-text-mine")
        } else {
            paragraph.appendChild(document.createTextNode(chatters._Nicknames[i]));
        }
        listItem.appendChild(paragraph);

        chatClientsList.appendChild(listItem);
        i++;
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


socket.on("a client logged in", function (chatters) {
    console.log("a client logged in");
    appendToNewChatClientsListHTMLComponentsFromClientsList(chatters);
});

socket.on("a client logged out", function (chatters) {
    console.log("a client logged out");
    appendToNewChatClientsListHTMLComponentsFromClientsList(chatters);

});

socket.on("you logged in", function (uuidv4, nickname, chatters) {
    console.log("you logged in");
    chatterClient = new Chatter(uuidv4,nickname);
    appendToNewChatClientsListHTMLComponentsFromClientsList(chatters);
});
