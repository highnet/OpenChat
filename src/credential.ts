export class Credential {
  private _username: string;
  private _password: string;

  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
  }

  public get Username(): string {
    return this._username;
  }

  public set Username(value: string) {
    this._username = value;
  }

  public get Password(): string {
    return this._password;
  }

  public set Password(value: string) {
    this._password = value;
  }
}
