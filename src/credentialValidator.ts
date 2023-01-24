import { Credential } from "./credential";

/*
  The server side CredentialValidator class represents a
  validator of Credential objects.
  Upon a receiving a Credential object to validate, 
*/

export class CredentialValidator {
  constructor() {}

  public ValidateCredentials(validLogins: any, credential: Credential): boolean {
    let result: boolean = false;
    console.log(credential.username, credential.password);
    for (let user of validLogins) {
      if (credential.username == user.username && credential.password == user.password) {
        result = true;
        break;
      }
    }

    return result;
  }
}
