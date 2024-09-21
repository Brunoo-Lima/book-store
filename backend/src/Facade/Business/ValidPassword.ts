import { Client } from "../../domain/Client";
import { IStrategy } from "../../interfaces/IStrategy";

export class ValidPassword implements IStrategy { //Atualizar está permitindo senhas inválidas
    async process(client: Client) {
        const passwordIsValid = client.password.length > 8
        if(passwordIsValid) return {success: "Password is valid !"}
        return {
            error: "Password invalid"
        }
    }
}
