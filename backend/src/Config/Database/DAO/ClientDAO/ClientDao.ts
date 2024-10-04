/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Client } from "../../../../Model/domain/Client";
import { EntityDomain } from "../../../../Model/domain/EntityDomain";
import { DAO } from "../DAO";
import { prisma } from "../../prisma/prismaClient";
import { randomUUID } from "crypto";
import { hashSync } from "bcrypt";
import { Gender } from "../../../../Model/domain/types/Gender";
export class ClientDao extends DAO {
    public async create(client: Client) {
        return await prisma.$transaction(async (prisma) => {
            // Inserir o cliente e obter o ID gerado
            const insertedClient = await prisma.$executeRaw`
                INSERT INTO Client (cli_id, cli_name, cli_dateOfBirth, cli_cpf, cli_status, cli_gender, cli_password, cli_email, cli_score, cli_profilePurchase, cli_ranking, created_at, updated_at)
                VALUES (${client.id}, ${client.name}, ${client.dateOfBirth}, ${client.cpf.code}, ${client.statusClient}, ${client.gender}, ${hashSync(client.password, 3)}, ${client.email}, 0, ${client.profilePurchase}, ${client.ranking}, ${client.createdAt}, ${client.updatedAt})
            `;

            // Inserir telefones
            for (const phon of client.phone) {
                await prisma.$executeRaw`
                INSERT INTO Phone (pho_id, pho_ddd, pho_number, pho_numberCombine, pho_type_phone, fk_pho_cli_id)
                VALUES (${randomUUID()}, ${phon.ddd}, ${phon.number}, ${`(${phon.ddd}) ${phon.number}`}, ${phon.typePhone}, ${client.id})
            `;
            }

            // Inserir endereços
            for (const address of client.addresses) {
                await prisma.$executeRaw`
                INSERT INTO Address (add_id, add_name, add_streetName, add_publicPlace, add_number, add_cep, add_neighborhood, add_compostName, add_typeResidence, add_city, add_state, add_isBilling, add_isDelivery, fk_add_cli_id)
                VALUES (${randomUUID()}, ${address.nameAddress}, ${address.streetName}, ${address.publicPlace}, ${address.number}, ${address.cep}, ${address.neighborhood}, ${address.compostName}, ${address.typeResidence}, ${address.city}, ${address.state}, ${address.change}, ${address.delivery}, ${client.id})
            `;
            }

            // Inserir cartões de crédito
            if (client.creditCart) {
                for (const card of client.creditCart) {
                    await prisma.$executeRaw`
                    INSERT INTO CreditCart (cre_id, cre_cvv, cre_dateMaturity, cre_name, cre_number_cart, cre_flag, cre_preference, fk_cre_cli_id)
                    VALUES (${randomUUID()}, ${card.cvv}, ${card.dateValid}, ${card.namePrinted}, ${card.number}, ${card.flag}, ${card.preference}, ${client.id})
                `;
                }
            }
            return insertedClient
        });
    }


    public update(entity: EntityDomain): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public delete(entity: EntityDomain): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async find(client: Client): Promise<object | null> {
        return await prisma.client.findFirst({
            select: {
                cli_cpf: true,
                cli_creditCards: true,
                cli_dateOfBirth: true,
                cli_gender: true,
                cli_phone: true,
                cli_profilePurchase: true,
                cli_ranking: true,
                cli_id: true,
                cli_name: true,
                cli_score: true,
                cli_status: true,
                cli_log: true,
                cli_address: true,
                cli_password: true,
                created_at: true,
            },
            where: {
                OR: [
                    {
                        cli_email: {
                            equals: client.email
                        }
                    },
                    {
                        cli_cpf: {
                            equals: client.cpf.code
                        }
                    }
                ]
            }
        })
    }
    async findMany(client: Client): Promise<unknown> {
        const filter: any = {}; // Objeto que armazenará os filtros dinâmicos

        // Criação de filtros dinâmicos baseados nos campos não vazios ou indefinidos do cliente
        if (client.name) filter.cli_name = client.name;
        if (client.cpf && client.cpf.code) filter.cli_cpf = client.cpf.code;
        if (client.dateOfBirth) filter.cli_dateOfBirth = client.dateOfBirth;
        if (client.gender && client.gender !== Gender.NULL) filter.cli_gender = client.gender;
        if (client.statusClient) filter.cli_status = client.statusClient;

        // Se o cliente tiver telefones, verificar cada número
        if (client.phone && client.phone.length > 0) {
            filter.cli_phone = {
                some: {
                    pho_number: {
                        in: client.phone.map(phone => phone.number)
                    }
                }
            };
        }

        // Se o cliente tiver endereços, verificar cada campo de endereço
        if (client.addresses && client.addresses.length > 0) {
            filter.cli_address = {
                some: {
                    add_cep: {
                        in: client.addresses.map(address => address.cep)
                    }
                }
            };
        }

        // Se o cliente tiver cartões de crédito, verificar cada número de cartão
        if (client.creditCart && client.creditCart.length > 0) {
            filter.cli_creditCards = {
                some: {
                    cre_number_cart: {
                        in: client.creditCart.map(card => card.number)
                    }
                }
            };
        }

        // Realiza a consulta com base nos filtros dinâmicos
        return await prisma.client.findMany({
            where: filter,
            select: {
                cli_cpf: true,
                cli_id: true,
                cli_creditCards: true,
                cli_dateOfBirth: true,
                cli_gender: true,
                cli_phone: true,
                cli_profilePurchase: true,
                cli_ranking: true,
                cli_name: true,
                cli_score: true,
                cli_status: true,
                cli_log: true,
                cli_address: true,
                cli_password: true,
                created_at: true,
            },
        });
    }
}

