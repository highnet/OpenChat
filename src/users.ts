import { v4 as uuidv4 } from "uuid";
import { User } from "./user";

export class Users {
  private _users: Array<User>;

  constructor() {
    this._users = [];
  }

  public get Users(): Array<User> {
    return this._users;
  }

  public set Users(value: Array<User>) {
    this._users = value;
  }

  public GenerateNewUser(): User {
    let newUser = new User();
    this._users.push(newUser);
    return newUser;
  }

  public RemoveOldUser(user: User): void {
    let index = this._users.indexOf(user);
    if (index !== -1) {
      this._users.splice(index, 1);
    }
  }
}
