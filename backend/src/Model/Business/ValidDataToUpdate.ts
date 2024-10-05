import { IStrategy } from "../../interfaces/IStrategy";
import { Client } from "../domain/Client";
import { ValidAddresses } from "./ValidAddresses";
import { ValidPassword } from "./ValidPassword";

export class ValidDataToUpdate implements IStrategy {
    async process(client: Client) {
        try {
            if(client.addresses.length > 0){
                const validAddress = new ValidAddresses().process(client)
                if("error" in validAddress){
                    return (await validAddress).error
                }
            }

            if (client.password) {
                const verifyPassword = new ValidPassword().process(client)
                if ("error" in verifyPassword) {
                    return verifyPassword.error
                }
            }
            return {
                success: 'Update is valid !'
            }
        } catch (e) {
            return {
                error: `This ${e} was found !`
            }
        }
    }
}
