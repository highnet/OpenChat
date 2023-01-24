import { Chatter } from "./chatter.js";

const ServerEmissions = {
  YOU_LOGGED_IN: "you logged in",
  A_CLIENT_LOGGED_IN: "a client logged in",
  A_CLIENT_LOGGED_OUT: "a client logged out",
  CHAT_MESSAGE: "chat message",
};

let socket = io();

let chatterClient = "";

function generateChatMessageHTMLComponent(messageData) {
  let messageBelongsToClient =
    chatterClient.messageBelongsToClient(messageData);
  let component = `
    <div class="container chat-message ${
      messageBelongsToClient ? "chat-message-mine" : "chat-message-other"
    }">
        <span class="container chat-message-chat-bubble"></span>
        <p class="container chat-message-chat-nickname ${
          messageBelongsToClient
            ? "chat-message-chat-nickname-mine"
            : "chat-message-chat-nickname-other"
        }">
            ${messageData.nickname + ":"} 
        </p>
        <p class="container chat-message-chat-text">
            ${messageData.text}
        </p>
        </div>`;

  let div = document.createElement("div");
  div.innerHTML = component;
  div.classList.add("chat-element");

  return div;
}

function resetChatClientsList() {
  while (chatClientsList.firstChild) {
    chatClientsList.removeChild(chatClientsList.firstChild);
  }
}

function generateChatClientsListHTMLComponent(chatters) {
  resetChatClientsList();
  let component = document.createDocumentFragment();
  for (let chatter of chatters._users) {
    let listItem = document.createElement("li");
    let text = document.createElement("div");

    if (chatter._uuid == chatterClient.uuid) {
      text.appendChild(document.createTextNode(chatter._nickname + " (You)"));
      text.classList.add(
        "chat-clients-toolbar-clients-list-username-text-mine"
      );
    } else {
      text.appendChild(document.createTextNode(chatter._nickname));
    }
    listItem.appendChild(text);

    component.appendChild(listItem);
  }
  return component;
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
  chatMessages.appendChild(generateChatMessageHTMLComponent(messageData));
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on(ServerEmissions.A_CLIENT_LOGGED_IN, function (users) {
  chatClientsList.appendChild(generateChatClientsListHTMLComponent(users));
});

socket.on(ServerEmissions.A_CLIENT_LOGGED_OUT, function (users) {
  chatClientsList.appendChild(generateChatClientsListHTMLComponent(users));
});

socket.on(ServerEmissions.YOU_LOGGED_IN, function (uuidv4, nickname, users) {
  chatterClient = new Chatter(uuidv4, nickname);
  chatClientsList.appendChild(generateChatClientsListHTMLComponent(users));
});
