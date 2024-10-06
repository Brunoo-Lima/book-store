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
import { StatusClient } from "../../../../Model/domain/types/StatusClient";
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
                    INSERT INTO CreditCard (cre_id, cre_cvv, cre_dateMaturity, cre_name, cre_number_cart, cre_flag, cre_preference, fk_cre_cli_id)
                    VALUES (${randomUUID()}, ${card.cvv}, ${card.dateValid}, ${card.namePrinted}, ${card.number}, ${card.flag}, ${card.preference}, ${client.id})
                `;
                }
            }
            return insertedClient
        });
    }


    public async update(client: Client): Promise<object | null> {
        return await prisma.client.update({
            data: {
                cli_password: client.password ? { set: hashSync(client.password, 2)}: undefined,
                cli_cpf: client.cpf.code ? { set: client.cpf.code} : undefined,
                cli_dateOfBirth: client.dateOfBirth ? { set: client.dateOfBirth }: undefined,
                cli_email: client.email ? { set: client.email } : undefined,
                cli_gender: client.gender ? { set: client.gender as string } : undefined,
                cli_name: client.name ? { set: client.name } : undefined,
                cli_phone: client.phone ? {
                    updateMany: client.phone.map((phon) => ({ // Relacionamentos many to many, tem que ser updateMany, mesmo atualizando 1 dado só
                        where: { pho_id: phon.id }, // Certifique-se de passar o ID do telefone correto
                        data: {
                            pho_ddd: phon.ddd,
                            pho_number: phon.number,
                            pho_numberCombine: `(${phon.ddd} ${phon.number})`
                        }
                    }))
                } : undefined,
                cli_profilePurchase: client.profilePurchase ? { set: client.profilePurchase as string } : undefined,
                cli_ranking: client.ranking ? { set: client.ranking } : undefined,
                cli_score: client.rfmScore ? { set: client.rfmScore } : undefined,
                cli_status: client.statusClient ? { set: client.statusClient as string } : undefined,
                cli_address: {
                    updateMany: client.addresses.map((address) => ({
                        where: { add_id: address.id }, // Certifique-se de que o `add_id` está correto
                        data: {
                            add_name: address.nameAddress ? { set: address.nameAddress } : undefined,
                            add_streetName: address.streetName ?  { set: address.streetName } : undefined,
                            add_publicPlace: address.publicPlace ? { set: address.publicPlace } : undefined,
                            add_number: address.number ? { set: address.number } : undefined,
                            add_cep: address.cep ? { set: address.cep } : undefined,
                            add_neighborhood: address.neighborhood ?{ set: address.neighborhood } : undefined,
                            add_city: address.city ?{ set: address.city } : undefined,
                            add_state: address.state ?{ set: address.state } : undefined,
                            add_compostName: address.compostName ?{ set: address.compostName } : undefined,
                            add_typeResidence: address.typeResidence ?{ set: address.typeResidence as string} : undefined,
                            add_isBilling: address.change ?{ set: address.change } : undefined,
                            add_isDelivery: address.delivery ?{ set: address.delivery } : undefined
                        }
                    }))
                },
                cli_creditCards: client.creditCart && client.creditCart.length !== 0? {
                    update: {
                        where: {
                            cre_id: client.creditCart[0].id
                        },
                        data: {
                            cre_cvv: client.creditCart ? client.creditCart[0].cvv : undefined,
                            cre_flag: client.creditCart ?client.creditCart[0].flag as string : undefined,
                            cre_dateMaturity: client.creditCart ?client.creditCart[0].dateValid : undefined,
                            cre_name: client.creditCart ?client.creditCart[0].namePrinted : undefined,
                            cre_number_cart: client.creditCart ?client.creditCart[0].number : undefined,
                        }
                    }
                }: undefined
            },
            where: {
                cli_id: client.id
            }
        });
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
                    },
                    {
                        cli_id: {
                            equals: client.id
                        }
                    }
                ]
            }
        })
    }
    public async findMany(client: Client): Promise<unknown> {
        const filter: any = {};

        // Aplicação dos filtros dinâmicos
        if (client.name) filter.cli_name = {
            contains: client.name
        };
        if (client.cpf && client.cpf.code) filter.cli_cpf = {
            contains: client.cpf.code
        };
        if (client.dateOfBirth) filter.cli_dateOfBirth = {
            equals: client.dateOfBirth
        };
        if (client.gender && client.gender !== Gender.NULL) filter.cli_gender = {
            equals: client.gender
        };
        if (client.statusClient && client.statusClient !== StatusClient.NULL) filter.cli_status = {
            equals: client.statusClient
        };

        // Se o cliente tiver telefones, adiciona filtro para telefones
        if (client.phone && client.phone.length > 0) {
            filter.cli_phone = {
                some: {
                    pho_number: { in: client.phone.map(phone => phone.number) },
                    pho_ddd: { in: client.phone.map(phone => phone.ddd) },
                },
            };
        }

        // Se o cliente tiver endereços, adiciona filtro para endereços
        if (client.addresses && client.addresses.length > 0) {
            filter.cli_address = {
                some: client.addresses.map(address => ({
                    add_name: { contains: address.nameAddress },
                    add_streetName: { contains: address.streetName },
                    add_publicPlace: { contains: address.publicPlace },
                    add_number: { contains: address.number },
                    add_cep: { contains: address.cep },
                    add_neighborhood: { contains: address.neighborhood },
                    add_city: { contains: address.city },
                    add_state: { contains: address.state },
                    add_compostName: { contains: address.compostName },
                    add_typeResidence: { equals: address.typeResidence },
                    add_isBilling: { equals: address.change },
                    add_isDelivery: { equals: address.delivery }
                }))[0]
            };
        }

        // Se o cliente tiver cartões de crédito, adiciona filtro para cartões
        if (client.creditCart && client.creditCart.length > 0) {
            filter.cli_creditCards = {
                some: client.creditCart.map(card => ({
                    cre_number_cart: { contains: card.number }
                }))
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

