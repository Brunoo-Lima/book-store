import { IStrategy } from "../../interfaces/IStrategy";
import { Address } from "../domain/Address";
import { Client } from "../domain/Client";
import { CreditCard } from "../domain/CreditCard";
import { ValidAddressToUpdate } from "./ValidAddressToUpdate";
// import { ValidCPF } from "./ValidCPF";
import { ValidCreditCard } from "./ValidCreditCard";
import { ValidPassword } from "./ValidPassword";
export class ValidDataToUpdate implements IStrategy {
    async process(client: Client): Promise<string | object | undefined> {
        try {
            if (client.password) {
                const verifyPassword = new ValidPassword().process(client);
                if ("error" in verifyPassword) {
                    return verifyPassword.error as object;
                }
            }
            if (client.addresses.length > 0) {
                const verifyAddress = await new ValidAddressToUpdate().process(
                    client
                );
                for (const address of client.addresses) {
                    for (const [key, value] of Object.entries(address)) {
                        const addressKey = key as keyof Address;

                        if (
                            address[addressKey] !== address.compostName &&
                            address[addressKey] !== address.id &&
                            !value
                        ) {
                            return {
                                error: `The key ${address} has value ${address}`,
                            };
                        }
                    }
                }
                if (verifyAddress.error) {
                    return verifyAddress;
                }
            }
            if (client.creditCard && client.creditCard.length > 0) {
                const verifyCreditCard = new ValidCreditCard().process(client);
                for (const card of client.creditCard) {
                    for (const [key, value] of Object.entries(card)) {
                        const cardKey = key as keyof CreditCard;
                        if (card[cardKey] !== card.id && !value) {
                            return {
                                error: `The key ${cardKey} cannot be ${value} !`,
                            };
                        }
                    }
                }
                if ("error" in verifyCreditCard) {
                    return verifyCreditCard;
                }
            }
            // if (client.cpf.code) {
            //     const verifyCpf = await new ValidCPF().process(client)
            //     if ("error" in verifyCpf) {
            //         return verifyCpf.error
            //     }
            // }
            return {
                success: "Update is valid !",
            };
        } catch (e) {
            return {
                error: `This ${e} was found !`,
            };
        }
    }
}
