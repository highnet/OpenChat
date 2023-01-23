import { v4 as uuidv4 } from 'uuid';
import { User } from './user';

export class Users {

    private _Uuids: Array<string>;
    private _Nicknames: Array<string>;
    private _users: Array<User>;

    constructor(){
        this._Uuids = [];
        this._Nicknames = [];
        this._users = [];
    }

    public get Uuids(): Array<string>{
        return this._Uuids;
    }

    public set Uuids(value: Array<string>){
        this._Uuids = value;
    }

    public get Nicknames(): Array<string>{
        return this._Nicknames;
    }

    public set Nicknames(value: Array<string>){
        this._Nicknames = value;
    }

    public get Users(): Array<User>{
        return this._users;
    }

    public set Users(value: Array<User>){
        this._users = value;
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

    public GenerateNewUser(newClientUserUniqueID:string, newNickname:string): void{
        this._Uuids.push(newClientUserUniqueID);
        this._Nicknames.push(newNickname);
    }

    public RemoveUser(newClientUserUniqueID: string, newNickname: string):void {
    let index = this._Uuids.indexOf(newClientUserUniqueID);
    if (index !== -1){
      this._Uuids.splice(index, 1);
    }
    index = this._Nicknames.indexOf(newNickname);
    if (index !== -1){
      this._Nicknames.splice(index, 1);
    }
}
}