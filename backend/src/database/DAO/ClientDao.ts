/* eslint-disable @typescript-eslint/no-unused-vars */

import { Client } from "../../domain/Client";
import { EntityDomain } from "../../domain/EntityDomain";
import { DAO } from "./DAO";
import { prisma } from "../../prisma/prismaClient";
import { hashSync } from 'bcrypt'
export class ClientDao extends DAO {
    public async create(client: Client) {
        return await prisma.client.create({
            data: {
                cli_id: client.id,
                cli_name: client.name,
                cli_dateOfBirth: client.dateOfBirth,
                cli_cpf: client.cpf.code,
                cli_status: client.statusClient,
                cli_gender: client.gender,
                cli_password: hashSync(client.password, 5),
                cli_score: client.rfmScore,
                cli_profilePurchase: client.profilePurchase,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                cli_address: {
                    createMany: {
                        data: client.addresses.map((address) => {
                            return {
                                add_id: address.id,
                                add_cep: address.cep,
                                add_city: address.city,
                                add_country: address.country,
                                add_neighborhood: address.neighborhood,
                                add_number: address.number,
                                add_publicPlace: address.publicPlace,
                                add_state: address.state,
                                add_streetName: address.streetName,
                                add_typeResidence: address.typeResidence,
                                add_compostName: address.compostName || null,
                                add_isBilling: address.change,
                                add_isDelivery: address.delivery
                            }
                        })
                    }
                },
                cli_ranking: {
                    create: {
                        ran_value: client.rfmScore,
                        fk_ran_cli_id: client.id
                    }
                },
                cli_phone: {
                    createMany: {
                        data: client.phone.map((phone) => {
                            return {
                                pho_ddd: phone.ddd,
                                pho_number: phone.number,
                                pho_numberCombine:`(${phone.ddd}) ${phone.number}`,
                                pho_type_phone: phone.typePhone
                            };
                        }),
                    }
                },
                cli_email: client.email,
            }
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
        return await prisma.client.findMany({
            where: {
                cli_cpf: {
                    contains: client.cpf.code
                },
                cli_email: {
                    contains: client.email
                },
                cli_name: {
                    contains: client.name
                },
                cli_dateOfBirth: {
                    contains: client.dateOfBirth
                },
                cli_gender: {
                    contains: client.dateOfBirth
                },

                cli_profilePurchase: {
                    contains: client.profilePurchase
                },
                cli_score: {
                    equals: client.rfmScore
                },
                cli_status: {
                    contains: client.statusClient
                },
            },
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
            }
        });
    }
}
