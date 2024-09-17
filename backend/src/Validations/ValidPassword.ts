import { Client } from "../domain/Client";
import { IStrategy } from "../interfaces/IStrategy";

export class ValidPassword implements IStrategy {
    process(client: Client): object {
        const passwordIsValid = client.password.length > 8
        if(passwordIsValid) return {success: "Password is valid !"}
        return {
            error: "Password invalid"
        }
    }
}
