/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unused-vars */

import { Client } from "../../../../Model/domain/Client";
import { EntityDomain } from "../../../../Model/domain/EntityDomain";
import { prisma } from "../../prisma/prismaClient";
import { hashSync } from "bcrypt";
import { Gender } from "../../../../Model/domain/types/Gender";
import { StatusClient } from "../../../../Model/domain/types/StatusClient";
import { IDao } from "../../../../interfaces/IDao";

export class ClientDao implements IDao {
    public async create(client: Client) {
        return await prisma.$transaction(async (prisma) => {
            const clientInserted = await prisma.client.create({
                data: {
                    cli_name: client.name,
                    cli_dateOfBirth: client.dateOfBirth,
                    cli_cpf: client.cpf.code,
                    cli_status: client.statusClient as string,
                    cli_gender: client.gender as string,
                    cli_password: hashSync(client.password, 3),
                    cli_email: client.email,
                    cli_score: 0,
                    cli_profilePurchase: client.profilePurchase as string,
                    cli_ranking: client.ranking,
                    created_at: new Date(client.createdAt),
                    updated_at: new Date(client.updatedAt),
                },
                include: {
                    cli_sales: true
                }
            })

            await prisma.address.createMany({
                data: client.addresses.map((address) => ({

                    add_name: address.nameAddress,
                    add_streetName: address.streetName,
                    add_publicPlace: address.publicPlace,
                    add_number: address.number,
                    add_cep: address.cep,
                    add_neighborhood: address.neighborhood,
                    add_city: address.city,
                    add_state: address.state,
                    add_compostName: address.compostName,
                    add_typeResidence: address.typeResidence as string,
                    add_isBilling: address.change as boolean,
                    add_isDelivery: address.delivery as boolean,
                    fk_add_cli_id: clientInserted.cli_id

                }))
            })
            if (client.creditCard) {
                await prisma.creditCard.createMany({

                    data: client.creditCard.map((card) => {
                        return {

                            cre_cvv: card.cvv,
                            cre_flag: card.flag as string,
                            cre_dateMaturity: card.dateValid,
                            cre_name: card.namePrinted,
                            cre_number_cart: card.number,
                            cre_preference: card.preference,
                            fk_cre_cli_id: clientInserted.cli_id
                        }
                    })

                })
            }
            await prisma.phone.createMany({
                data: client.phones.map((phone) => {
                    return {
                        pho_ddd: phone.ddd,
                        pho_number: phone.number,
                        pho_numberCombine: `(${phone.ddd})  ${phone.number}`,
                        pho_type_phone: phone.typePhone as string,
                        fk_pho_cli_id: clientInserted.cli_id
                    }
                })
            })
            return clientInserted;
        })
    }



    public async update(client: Client): Promise<object | null> {
        return await prisma.client.update({
            data: {
                cli_password: client.password ? { set: hashSync(client.password, 2) } : undefined,
                cli_cpf: client.cpf.code ? { set: client.cpf.code } : undefined,
                cli_dateOfBirth: client.dateOfBirth ? { set: client.dateOfBirth } : undefined,
                cli_email: client.email ? { set: client.email } : undefined,
                cli_gender: client.gender ? { set: client.gender as string } : undefined,
                cli_name: client.name ? { set: client.name } : undefined,
                cli_phone: client.phones ? {
                    updateMany: client.phones
                        .filter(phone => phone.id) // Atualiza apenas os telefones que têm ID (existentes)
                        .map((phone) => ({
                            where: { pho_id: phone.id },
                            data: {
                                pho_ddd: phone.ddd,
                                pho_number: phone.number,
                                pho_numberCombine: `(${phone.ddd} ${phone.number})`,
                                pho_type_phone: phone.typePhone as string
                            }
                        })),
                    createMany: {
                        data: client.phones
                            .filter(phone => !phone.id) // Cria novos telefones que não têm ID
                            .map((phone) => ({
                                pho_ddd: phone.ddd,
                                pho_number: phone.number,
                                pho_numberCombine: `(${phone.ddd} ${phone.number})`,
                                pho_type_phone: phone.typePhone as string
                            }))
                    }
                } : undefined,
                cli_profilePurchase: client.profilePurchase ? { set: client.profilePurchase as string } : undefined,
                cli_ranking: client.ranking ? { set: client.ranking } : undefined,
                cli_score: client.rfmScore ? { set: client.rfmScore } : undefined,
                cli_status: client.statusClient ? { set: client.statusClient as string } : undefined,
                cli_address: {
                    updateMany: client.addresses
                        .filter(address => address.id) // Atualiza apenas endereços que têm ID (existentes)
                        .map((address) => ({
                            where: { add_id: address.id },
                            data: {
                                add_name: address.nameAddress ? { set: address.nameAddress } : undefined,
                                add_streetName: address.streetName ? { set: address.streetName } : undefined,
                                add_publicPlace: address.publicPlace ? { set: address.publicPlace } : undefined,
                                add_number: address.number ? { set: address.number } : undefined,
                                add_cep: address.cep ? { set: address.cep } : undefined,
                                add_neighborhood: address.neighborhood ? { set: address.neighborhood } : undefined,
                                add_city: address.city ? { set: address.city } : undefined,
                                add_state: address.state ? { set: address.state } : undefined,
                                add_compostName: address.compostName ? { set: address.compostName } : undefined,
                                add_typeResidence: address.typeResidence ? { set: address.typeResidence as string } : undefined,
                                add_isBilling: address.change ? { set: address.change } : undefined,
                                add_isDelivery: address.delivery ? { set: address.delivery } : undefined
                            }
                        })),
                    createMany: {
                        data: client.addresses
                            .filter(address => !address.id) // Cria novos endereços que não têm ID
                            .map((address) => ({
                                add_name: address.nameAddress,
                                add_streetName: address.streetName,
                                add_publicPlace: address.publicPlace,
                                add_number: address.number,
                                add_cep: address.cep,
                                add_neighborhood: address.neighborhood,
                                add_city: address.city,
                                add_state: address.state,
                                add_compostName: address.compostName,
                                add_typeResidence: address.typeResidence as string,
                                add_isBilling: address.change as boolean,
                                add_isDelivery: address.delivery as boolean
                            }))
                    }
                },
                cli_creditCards: client.creditCard && client.creditCard.length !== 0 ? {
                    updateMany: client.creditCard
                        .filter(card => card.id) // Atualiza apenas os cartões que têm ID (existentes)
                        .map((card) => ({
                            where: { cre_id: card.id },
                            data: {
                                cre_cvv: card.cvv,
                                cre_flag: card.flag as string,
                                cre_dateMaturity: card.dateValid,
                                cre_name: card.namePrinted,
                                cre_number_cart: card.number,
                                cre_preference: card.preference
                            }
                        })),
                    createMany: {
                        data: client.creditCard
                            .filter(card => !card.id) // Cria novos cartões que não têm ID
                            .map((card) => ({
                                cre_cvv: card.cvv,
                                cre_flag: card.flag as string,
                                cre_dateMaturity: card.dateValid,
                                cre_name: card.namePrinted,
                                cre_number_cart: card.number,
                                cre_preference: card.preference
                            }))
                    }
                } : undefined,
                updated_at: new Date().toISOString()
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
        if (client.phones && client.phones.length > 0) {
            filter.cli_phone = {
                some: {
                    pho_number: { in: client.phones.map(phone => phone.number) },
                    pho_ddd: { in: client.phones.map(phone => phone.ddd) },
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
        if (client.creditCard && client.creditCard.length > 0) {
            filter.cli_creditCards = {
                some: client.creditCard.map(card => ({
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

