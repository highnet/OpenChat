import { v4 as uuidv4 } from 'uuid';

export class ActiveChatters {

    private _activeUuids: Array<string>;
    private _activeNicknames: Array<string>;

    constructor(){
        this._activeUuids = [];
        this._activeNicknames = [];
    }

    public get ActiveUuids(): Array<string>{
        return this._activeUuids;
    }

    public set ActiveUuids(value: Array<string>){
        this._activeUuids = value;
    }

    public get ActiveNicknames(): Array<string>{
        return this._activeNicknames;
    }

    public set ActiveNicknames(value: Array<string>){
        this._activeNicknames = value;
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
        this._activeUuids.push(newClientUserUniqueID);
        this._activeNicknames.push(newNickname);
    }

    public RemoveUser(newClientUserUniqueID: string, newNickname: string):void {
    let index = this._activeUuids.indexOf(newClientUserUniqueID);
    console.log("index of ", newClientUserUniqueID, "is: ", index);
    if (index !== -1){
      this._activeUuids.splice(index, 1);
    }
    index = this._activeNicknames.indexOf(newNickname);
    console.log("index of ", newNickname, "is: ", index);
    if (index !== -1){
      this._activeNicknames.splice(index, 1);
    }
    }
}