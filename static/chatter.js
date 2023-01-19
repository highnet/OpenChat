let _nickname = "";

export class Chatter{

    constructor(){
        let _nickname = "";
        let adjectives = ["Dopey", "Doc", "Sneezy", "Bashful", "Sleepy", "Grumpy", "Happy"];
        let subjectives = ["Car", "Dog", "House", "Moon", "Water", "Table", "Trouble"];
        let randomAdjective = adjectives[Math.floor(Math.random()*adjectives.length)];
        let randomSubjective = subjectives[Math.floor(Math.random()*subjectives.length)];
        _nickname += randomAdjective;
        _nickname += randomSubjective;
        _nickname += Math.floor(Math.random() * 90 + 10);    
        nicknameInputField.value = _nickname;
    }

    get nickname(){
        return _nickname;
    }
 
    set nickname(value){
        _nickname = value;
    }
}