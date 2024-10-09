import { Client as PrismaClient } from "@prisma/client";
import { Client } from '../domain/Client';
import { Facade } from "../../Controllers/Facade/Facade";
import { IStrategy } from "../../interfaces/IStrategy";

export class ValidAddressToUpdate implements IStrategy {
    async process(client: Client) {
        try {
            const facade = new Facade(client);
            const clientExist = await facade.find() as PrismaClient;

            if (clientExist && "cli_address" in clientExist && clientExist.cli_address instanceof Array) {
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
                    const existingAddress = clientExist.cli_address.find(addr => addr.id === newAddress.id);

                    if (existingAddress) {
                        
                        // Verificar mudanças no campo 'isBilling'
                        if (existingAddress.add_isBilling && newAddress.change === false) {
                            billingCount--; // Se ele mudar um endereço de cobrança para 'false', removemos um da contage

                        } else if (!existingAddress.add_isBilling && newAddress.change === true) {

                            billingCount++; // Se ele mudar um endereço que não era de cobrança para 'true', adicionamos um
                        }

                        // Verificar mudanças no campo 'isDelivery'
                        if (existingAddress.add_isDelivery && newAddress.delivery === false) {
                            deliveryCount--; // Remover um da contagem de entrega

                        } else if (!existingAddress.add_isDelivery && newAddress.delivery === true) {
                            deliveryCount++; // Adicionar um à contagem de entrega
                        }
                    } else {
                        // Novo endereço sendo adicionado, contamos o valor informado pelo cliente
                        if (newAddress.change === true) billingCount++;
                        if (newAddress.delivery === true) deliveryCount++;
                    }
                }

                // Verificação final: o cliente precisa ter pelo menos 1 endereço de cobrança e 1 de entrega
                if (billingCount === 0) {
                    return {
                        error: 'The client must have at least one billing address after the update.'
                    };
                }

                if (deliveryCount === 0) {
                    return {
                        error: 'The client must have at least one delivery address after the update.'
                    };
                }
            }

            return { success: 'Address update is valid!' };
        } catch (error) {
            return { error: `An error occurred: ${error}` };
        }
    }
}
