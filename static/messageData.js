let _text = "";
let _nickname = "";
let _uuid = "";
let _timeStamp = "";

export class MessageData{
    
  constructor(text, nickname, uuid){
    _text = text;
    _nickname = nickname;
    _uuid = uuid;
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

  get uuid(){
    return _uuid;
  }
 
  set uuid(value){
    _uuid = value;
  }


  toJSON() {
    return {
      text: _text,
      nickname: _nickname,
      uuid: _uuid,
      timestamp: _timeStamp
    };
  }

}