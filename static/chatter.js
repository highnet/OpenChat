import { MessageData } from "./messageData.js";
let _uuid = "";
let _nickname = "";
let _messages = [];

export class Chatter{

    constructor(){
        _nickname = this.generateRandomNickname();
        nicknameInputField.value = _nickname;
       _uuid = this.uuidv4();
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
    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    }

}