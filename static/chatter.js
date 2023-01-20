import { MessageData } from "./messageData.js";
let _uuid = "";
let _nickname = "";
let _messages = [];

export class Chatter{

    constructor(uuidv4){
        _nickname = this.generateRandomNickname();
        nicknameInputField.value = _nickname;
       _uuid = uuidv4;
    }

    get nickname(){
        return _nickname;
    }
 
    set nickname(value){
        _nickname = value;
    }

    get uuid(){
        return _uuid;
    }
 
    set uuid(value){
        _uuid = value;
    }

    get messages(){
        return _messages;
    }
 
    set messages(value){
        _messages = value;
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
            _nickname,
            _uuid
        );
        _messages.push(messageData);
        return messageData;
    }


}