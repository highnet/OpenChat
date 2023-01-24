import { MessageData } from "./messageData.js";

export class Chatter {
  _uuid = "";
  _messages = [];
  _nickname = "";
  constructor(uuidv4, nickname) {
    this._uuid = uuidv4;
    this._nickname = nickname;
  }

  get nickname() {
    return this._nickname;
  }

  set nickname(value) {
    this._nickname = value;
  }

  get uuid() {
    return this._uuid;
  }

  set uuid(value) {
    this._uuid = value;
  }

  get messages() {
    return this._messages;
  }

  set messages(value) {
    this._messages = value;
  }

  generateMessageData(text) {
    const messageData = new MessageData(
      messageInputField.value,
      this._uuid,
      this._nickname
    );
    this._messages.push(messageData);
    return messageData;
  }
}
