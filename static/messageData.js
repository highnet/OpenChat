export class MessageData{

  _text = "";
  _nickname = "";
  _uuid = "";
  _timeStamp = "";

  constructor(text, nickname, uuid){
    this._text = text;
    this._nickname = nickname;
    this._uuid = uuid;
    this._timeStamp = Date.now();
  }

  get text(){
    return this._text;
  }
 
  set text(value){
    this._text = value;
  }

  get nickname(){
    return this._nickname;
  }
 
  set nickname(value){
    this._nickname = value;
  }

  get timeStamp(){
    return this._timeStamp;
  }
 
  set timeStamp(value){
    this._timeStamp = value;
  }

  get uuid(){
    return this._uuid;
  }
 
  set uuid(value){
    this._uuid = value;
  }


  toJSON() {
    return {
      text: this._text,
      nickname: this._nickname,
      uuid: this._uuid,
      timestamp: this._timeStamp
    };
  }

}