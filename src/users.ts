import { v4 as uuidv4 } from "uuid";
import { User } from "./user";

export class Users {
  private _Users: Array<User>;

  constructor() {
    this._Users = [];
  }

  public get Users(): Array<User> {
    return this._Users;
  }

  public set Users(value: Array<User>) {
    this._Users = value;
  }

  public GenerateNewUser(): User {
    let newUser = new User();
    this._Users.push(newUser);
    return newUser;
  }

  public RemoveOldUser(user: User): void {
    let index = this._Users.indexOf(user);
    if (index !== -1) {
      this._Users.splice(index, 1);
    }
  }
}
