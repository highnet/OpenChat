import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export class User {
  private _uuid: string;
  private _nickname: string;

  constructor() {
    this._uuid = uuidv4();
    this._nickname = this.generateRandomNickname();
  }

  private generateRandomNickname(): string {
    let result = "";
    let nicknames = JSON.parse(fs.readFileSync("nicknames.json", "utf8"));
    const firstNames = nicknames.firstNames;
    const lastNames = nicknames.lastNames;
    let randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    let randomSecondName =
      lastNames[Math.floor(Math.random() * lastNames.length)];
    result +=
      randomFirstName + randomSecondName + Math.floor(Math.random() * 90 + 10);
    return result;
  }

  public get Uuid(): string {
    return this._uuid;
  }

  public set Uuid(value: string) {
    this._uuid = value;
  }

  public get Nickname(): string {
    return this._nickname;
  }

  public set Nickname(value: string) {
    this._nickname = value;
  }
}
