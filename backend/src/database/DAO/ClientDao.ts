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
                cli_email: client.email,
                cli_ranking: {
                    connectOrCreate: {
                        create: {
                            ran_id: client.ranking.id,
                            ran_value: client.ranking.value
                        },
                        where: {
                            fk_ran_cli_id: client.id // Chave estrangeira correta
                        }
                    }
                },
                fk_cli_ran_id: client.ranking.id // Relacionamento correto de ranking
            },
        });
    }


    public update(entity: EntityDomain): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public delete(entity: EntityDomain): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public find(entity: EntityDomain): Promise<void> {
        throw new Error("Method not implemented.");
    }

}
