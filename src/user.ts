import { v4 as uuidv4 } from 'uuid';
import fs from "fs";

export class User{

    private _Uuid: string;
    private _Nickname: string;

    constructor(){
        this._Uuid = uuidv4();
        this._Nickname = this.generateRandomNickname();
    }

    private generateRandomNickname(): string{
        let result = "";
        let nicknames = JSON.parse(
         fs.readFileSync(
            'nicknames.json',
            'utf8'
        ));
        const firstNames = nicknames.firstNames;
        const lastNames = nicknames.lastNames;
        let randomAdjective = firstNames[Math.floor(Math.random()*firstNames.length)];
        let randomSubjective = lastNames[Math.floor(Math.random()*lastNames.length)];
        result += randomAdjective;
        result += randomSubjective;
        result += Math.floor(Math.random() * 90 + 10); 
        return result; 
    }

    public get Uuid(): string{
        return this._Uuid;
    }

    public set Uuid(value: string){
        this._Uuid = value;
    }

    public get Nickname(): string{
        return this._Nickname;
    }

    public set Nickname(value: string){
        this._Nickname = value;
    }
}