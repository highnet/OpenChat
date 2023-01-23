import { Chatter } from "./chatter.js";

const ServerEmissions = {
  YOU_LOGGED_IN : "you logged in",
  A_CLIENT_LOGGED_IN : "a client logged in",
  A_CLIENT_LOGGED_OUT : "a client logged out",
  CHAT_MESSAGE : "chat message"
}

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

    while( chatClientsList.firstChild ){
        chatClientsList.removeChild( chatClientsList.firstChild );
    }

    for(let chatter of chatters._Users){
        let listItem = document.createElement('li');
        let text = document.createElement('div');
        
        if (chatter._Uuid == chatterClient.uuid){
            text.appendChild(document.createTextNode(chatter._Nickname + " (You)"));
            text.classList.add("chat-clients-toolbar-clients-list-username-text-mine")
        } else {
            text.appendChild(document.createTextNode(chatter._Nickname));
        }
        listItem.appendChild(text);

        chatClientsList.appendChild(listItem);
    }
    
}

messageInputForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let messageData = chatterClient.generateMessageData(messageInputField.value);

  if (messageData.text != "") {
    socket.emit(ServerEmissions.CHAT_MESSAGE, messageData);
    messageInputField.value = "";
    }
});

socket.on(ServerEmissions.CHAT_MESSAGE, function (messageData) {
  appendToChatMessagesNewHTMLComponentFromMessageData(messageData);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


socket.on(ServerEmissions.A_CLIENT_LOGGED_IN, function (users) {
    appendToNewChatClientsListHTMLComponentsFromClientsList(users);
});

socket.on(ServerEmissions.A_CLIENT_LOGGED_OUT, function (users) {
    appendToNewChatClientsListHTMLComponentsFromClientsList(users);

});

socket.on(ServerEmissions.YOU_LOGGED_IN, function (uuidv4, nickname, users) {
    chatterClient = new Chatter(uuidv4, nickname);
    appendToNewChatClientsListHTMLComponentsFromClientsList(users);
});
