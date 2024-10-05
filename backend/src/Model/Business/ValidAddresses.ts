import { Facade } from '../../Controllers/Facade/Facade';
import { IStrategy } from '../../interfaces/IStrategy';
import { Client } from '../domain/Client';
import { Address, Client as PrismaClient } from '@prisma/client';

export class ValidAddresses implements IStrategy {
    async process(client: Client) {
        try {
            let hasBilling = false;
            let hasDelivery = false;

            // Verifica se o cliente já existe no banco de dados
            const facade = new Facade(client);
            const entityExist = await facade.find() as PrismaClient;

            if (entityExist && "cli_address" in entityExist) {
                const existingAddresses = entityExist.cli_address as Address[];

                // Verifica se existe pelo menos um endereço de cobrança no banco de dados
                hasBilling = existingAddresses.some(address => address.add_isBilling);
                hasDelivery = existingAddresses.some(address => address.add_isDelivery);
            }

            for (const address of client.addresses) {
                // Verifica se o endereço tem delivery ou change como false
                if (!address.delivery && !address.change) {
                    return {
                        error: "Addresses cannot have both delivery and billing set to false."
                    };
                }

                // Verifica se já existe um endereço de cobrança
                if (address.change) {
                    if (hasBilling) {
                        return {
                            error: "There can only be one billing address."
                        };
                    }
                    hasBilling = true;  // Marca que um endereço de cobrança foi encontrado
                }

                // Atualiza a flag de delivery se algum endereço for de entrega
                if (address.delivery) {
                    hasDelivery = true;
                }
            }

            // Verifica se o cliente está tentando alterar o único endereço de cobrança para false
            if (!hasBilling && client.addresses.some(address => address.change === false)) {
                return {
                    error: "Cannot remove the only billing address."
                };
            }

            // Verifica se existe pelo menos um endereço de entrega
            if (!hasDelivery) {
                return {
                    error: "The client must have at least one delivery address."
                };
            }

            return {
                success: "Addresses are valid!"
            };
        } catch (e) {
            return {
                error: `Error found: ${e}`
            };
        }
    }
}
