import { MessageData } from "./messageData.js";

let _nickname = "";
let messages = [];

export class Chatter{

    constructor(){
        _nickname = this.generateRandomNickname();
        nicknameInputField.value = _nickname;
    }

    get nickname(){
        return _nickname;
    }
 
    set nickname(value){
        _nickname = value;
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
            _nickname
        );
        messages.push(messageData);
        return messageData;
    }

}