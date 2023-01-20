let _text = "";
let _nickname = "";
let _timeStamp = "";

export class MessageData{
    
  constructor(text, nickname){
    _text = text;
    _nickname = nickname;
    _timeStamp = Date.now();
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

  get timeStamp(){
    return _timeStamp;
  }
 
  set timeStamp(value){
    _timeStamp = value;
  }

  toJSON() {
    return {
      text: _text,
      nickname: _nickname,
      timestamp: _timeStamp
    };
  }

}