/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from "../../domain/Client";
import { EntityDomain } from "../../domain/EntityDomain";
import { DAO } from "./DAO";
import { prisma } from "../../prisma/prismaClient";

export class ClientDao extends DAO{
    public async create(client: Client): Promise<unknown> {
        return await prisma.client.create({
            data: {
                cli_id: client.id,
                cli_name: client.name,
                cli_dateOfBirth: client.dateOfBirth.toString(),
                cli_cpf: client.cpf.code,
                cli_status: client.statusClient,
                cli_gender: client.gender,
                cli_password: client.password,
                cli_score: client.rfmScore,
                cli_profilePurchase: client.profilePurchase,
                created_at: new Date().toString(),
                updated_at: new Date().toString(),
                cli_address: {
                    createMany: {
                        skipDuplicates: true,
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
                                add_compostName: address.compostName || undefined,
                                add_isBilling: address.change,
                                add_isDelivery: address.delivery
                            }
                        })
                    }
                },
                cli_ranking: {
                    connectOrCreate: {
                        create: {
                            ran_value: 0,
                            fk_ran_cli_id: client.id
                        },
                        where: {
                            fk_ran_cli_id: client.id
                        }
                    }
                },
                cli_email: client.email,

            },
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
                created_at: true,
            },
            where: {
                cli_email: client.email,
                cli_password: client.password
            }
        })
    }

}
