import { User } from "./user";

export class Users {
  private _users: Array<User>;

  constructor() {
    this._users = [];
  }

  public get users(): Array<User> {
    return this._users;
  }

  public set users(value: Array<User>) {
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
