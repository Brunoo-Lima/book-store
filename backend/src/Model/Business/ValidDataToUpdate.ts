import { IStrategy } from "../../interfaces/IStrategy";
import { Client } from "../domain/Client";
import { ValidAddressToUpdate } from "./ValidAddressToUpdate";
import { ValidCreditCard } from "./ValidCreditCard";
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
            if(client.creditCard && client.creditCard.length > 0){
                const verifyCreditCard = new ValidCreditCard().process(client)
                if("error" in verifyCreditCard){
                    return verifyCreditCard
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
