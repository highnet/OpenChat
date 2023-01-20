export class MessageData{

  _text = "";
  _uuid = "";
  _timeStamp = "";
  _nickname = "";

  constructor(text, uuid, nickname){
    this._text = text;
    this._uuid = uuid;
    this._timeStamp = Date.now();
    this._nickname = nickname;
  }

  get text(){
    return this._text;
  }
 
  set text(value){
    this._text = value;
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

  get nickname(){
    return this._nickname;
  }
 
  set nickname(value){
    this._nickname = value;
  }


  toJSON() {
    return {
      text: this._text,
      uuid: this._uuid,
      timestamp: this._timeStamp,
      nickname: this._nickname
    };
  }

}