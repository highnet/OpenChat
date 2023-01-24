import { Credential } from "./credential";

export class CredentialValidator {
  constructor() {}

  public ValidateCredentials(
    validLogins: any,
    credential: Credential
  ): boolean {
    let result: boolean = false;
    console.log(credential.Username, credential.Password);
    for (let user of validLogins) {
      if (
        credential.Username == user.username &&
        credential.Password == user.password
      ) {
        result = true;
        break;
      }
    }

    return result;
  }
}
