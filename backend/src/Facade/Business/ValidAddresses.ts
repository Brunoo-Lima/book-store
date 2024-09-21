import { IStrategy } from '../../interfaces/IStrategy';
import { Client } from '../../domain/Client';

export class ValidAddresses implements IStrategy {
    async process(client: Client) {
        let hasDelivery = false;
        let hasBilling = false;

        for (const address of client.addresses) {
            // Verifica se o endereço tem delivery ou change como false
            if (!address.delivery && !address.change) {
                return {
                    error: "Addresses cannot have both delivery and billing set to false."
                };
            }

            // Verifica se já existe um endereço com delivery = true
            if (address.delivery) {
                if (hasDelivery) {
                    return {
                        error: "There can only be one delivery address."
                    };
                }
                hasDelivery = true;
            }

            // Verifica se já existe um endereço com change = true (cobrança)
            if (address.change) {
                if (hasBilling) {
                    return {
                        error: "There can only be one billing address."
                    };
                }
                hasBilling = true;
            }
        }

        // Verifica se existe pelo menos um endereço de entrega e um de cobrança
        if (!hasDelivery || !hasBilling) {
            return {
                error: "The client must have at least one delivery and one billing address, even if it's the same address."
            };
        }

        return {
            success: "Addresses are valid!"
        };
    }
}
