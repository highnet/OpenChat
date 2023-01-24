import { Credential } from "./credential";

export class CredentialValidator {
  constructor() {}

  public ValidateCredentials(
    validLogins: any,
    credential: Credential
  ): boolean {
    let result: boolean = false;
    console.log(credential.username, credential.password);
    for (let user of validLogins) {
      if (
        credential.username == user.username &&
        credential.password == user.password
      ) {
        result = true;
        break;
      }
    }

    return result;
  }
}
