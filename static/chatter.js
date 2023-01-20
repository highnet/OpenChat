import { MessageData } from "./messageData.js";


export class Chatter{
    _uuid = "";
    _nickname = "";
    _messages = [];
    constructor(uuidv4){
        this._nickname = this.generateRandomNickname();
        nicknameInputField.value = this._nickname;
       this._uuid = uuidv4;
    }

    get nickname(){
        return this._nickname;
    }
 
    set nickname(value){
        this._nickname = value;
    }

    get uuid(){
        return this._uuid;
    }
 
    set uuid(value){
        this._uuid = value;
    }

    get messages(){
        return this._messages;
    }
 
    set messages(value){
        this._messages = value;
    }

    generateRandomNickname(){
        let result = "";
        const adjectives = ["Dopey", "Doc", "Sneezy", "Bashful", "Sleepy", "Grumpy", "Happy"];
        const subjectives = ["Car", "Dog", "House", "Moon", "Water", "Table", "Trouble"];
        let randomAdjective = adjectives[Math.floor(Math.random()*adjectives.length)];
        let randomSubjective = subjectives[Math.floor(Math.random()*subjectives.length)];
        result += randomAdjective;
        result += randomSubjective;
        result += Math.floor(Math.random() * 90 + 10); 
        return result; 
    }

    generateMessageData(text){
        const messageData = new MessageData(
            messageInputField.value, 
            this._nickname,
            this._uuid
        );
        this._messages.push(messageData);
        return messageData;
    }


}