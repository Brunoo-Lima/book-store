import { IStrategy } from "../../interfaces/IStrategy";
import { Client } from "../domain/Client";
import { ValidAddressToUpdate } from "./ValidAddressToUpdate";
import { ValidPassword } from "./ValidPassword";
export class ValidDataToUpdate implements IStrategy {
    async process(client: Client): Promise<string | object | undefined>{
        try {
            if (client.password) {
                const verifyPassword = new ValidPassword().process(client)
                if ("error" in verifyPassword) {
                    return verifyPassword.error as object
                }
            }
            if(client.addresses.length > 0){
                const verifyAddress =  await new ValidAddressToUpdate().process(client)

                if (verifyAddress.error) {
                    return verifyAddress
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
