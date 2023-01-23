import { v4 as uuidv4 } from 'uuid';

export class User{

    private _Uuid: string;
    private _Nickname: string;

    constructor(){
        this._Uuid = uuidv4();
        this._Nickname = this.generateRandomNickname();
    }

    private generateRandomNickname(): string{
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