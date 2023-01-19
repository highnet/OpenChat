let _text = "";
let _nickname = "";

export class MessageData{
    
    constructor(text, nickname){
        _text = text;
        _nickname = nickname;
    }

    get text(){
        return _text;
        }
 
    set text(value){
        _text = value;
    }

    get nickname(){
        return _nickname;
    }
 
    set nickname(value){
        _nickname = value;
    }

  toJSON() {
    return {
      text: _text,
      nickname: _nickname
    };
  }

    
}