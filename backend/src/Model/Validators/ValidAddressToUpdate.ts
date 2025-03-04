import { Client as PrismaClient } from "@prisma/client";
import { Client } from "../entities/Client/Client";
import { Facade } from "../../Controllers/Facade/Facade";
import { IStrategy } from "../../interfaces/IStrategy";

export class ValidAddressToUpdate implements IStrategy {
    async process(client: Client) {
        try {
            const facade = new Facade();
            const clientExist = (await facade.find(client)) as PrismaClient;
            if (
                clientExist &&
                "cli_address" in clientExist &&
                clientExist.cli_address instanceof Array
            ) {
                // Contadores para verificar quantos endereços de cobrança e entrega existirão após as alterações
                let billingCount = 0;
                let deliveryCount = 0;

                // Primeiro, contamos os endereços do banco de dados
                for (const address of clientExist.cli_address) {
                    if (address.add_isBilling) billingCount++;
                    if (address.add_isDelivery) deliveryCount++;
                }
                // Agora, aplicamos as mudanças que o cliente está tentando fazer
                for (const newAddress of client.addresses) {
                    const existingAddress = clientExist.cli_address.find(
                        (addr) => addr.id === newAddress.id
                    );

                    if (existingAddress) {
                        // Atualizar contagem de billing
                        if (
                            existingAddress.add_isBilling &&
                            newAddress.change === false
                        ) {
                            billingCount--; // Se alterar um endereço de cobrança para false
                        } else if (
                            !existingAddress.add_isBilling &&
                            newAddress.change === true
                        ) {
                            billingCount++; // Se alterar um endereço para cobrança
                        }

                        // Atualizar contagem de delivery
                        if (
                            existingAddress.add_isDelivery &&
                            newAddress.delivery === false
                        ) {
                            deliveryCount--; // Remover da contagem de entrega
                        } else if (
                            !existingAddress.add_isDelivery &&
                            newAddress.delivery === true
                        ) {
                            deliveryCount++; // Adicionar à contagem de entrega
                        }
                    } else if (
                        clientExist.cli_address.some(
                            (address) => address.add_isBilling === true
                        ) &&
                        client.addresses.some((address) => address.change)
                    ) {
                        billingCount++;
                    }
                }
                // Validação final para billing
                if (billingCount === 0) {
                    return {
                        error: "The client must have at least one billing address after the update.",
                    };
                }

                // if (billingCount > 1) {
                //     return {
                //         error: "The client have more than one billing address!",
                //     };
                // }
                if (deliveryCount === 0) {
                    return {
                        error: "The client must have at least one delivery address after the update.",
                    };
                }
            }

            return { success: "Address update is valid!" };
        } catch (error) {
            return { error: `An error occurred: ${error}` };
        }
    }
}
