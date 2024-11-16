import { IStrategy } from "../../interfaces/IStrategy";
import { Client } from "../domain/Client";
import { StatusClient } from "../domain/types/StatusClient";

export class ValidDataClient implements IStrategy {
    process(client: Client): object {
        if (client.statusClient === StatusClient.NULL) {
            return {
                error: "Type expect is: ACTIVATE or INACTIVATE",
            };
        }
        for (const cli in client) {
            const keyClient = cli as keyof Client;
            if (client[keyClient] === client.creditCard) {
                if (client.creditCard === null) continue;
            }

            if (!client[keyClient] && client[keyClient] !== 0) {
                return {
                    error: `The field ${keyClient} is required and was not provided. You send: ${client[keyClient]}`,
                };
            }
        }
        const phones = client.phones;
        if (phones && phones.length > 0) {
            for (const phone of phones) {
                if (!phone.ddd || !phone.number) {
                    return {
                        error: "All phone fields (ddd, number) are required when phones are provided.",
                    };
                }
            }
        }

        // Validar endereços usando o getter
        const addresses = client.addresses;
        if (addresses && addresses.length > 0) {
            for (const address of addresses) {
                if (
                    !address.streetName ||
                    !address.cep ||
                    !address.city ||
                    !address.state
                ) {
                    return {
                        error: "Address fields (streetName, cep, city, state) are required for all addresses.",
                    };
                }
            }
        }
        const creditCart = client.creditCard;
        if (creditCart && creditCart.length > 0) {
            for (const card of creditCart) {
                if (
                    !card.namePrinted ||
                    !card.number ||
                    !card.cvv ||
                    !card.dateValid
                ) {
                    return {
                        error: "Credit card fields cannot be empty or null!",
                    };
                }
            }
        }

        // Validar cartões de crédito usando o getter

        return {
            success: "All required data is valid.",
        };
    }
}
