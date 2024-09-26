/* eslint-disable @typescript-eslint/no-unused-vars */

import { Client } from "../../../domain/Client";
import { EntityDomain } from "../../../domain/EntityDomain";
import { DAO } from "../DAO";
import { prisma } from "../../prisma/prismaClient";
import { hashSync } from 'bcrypt'
export class ClientDao extends DAO {
    public async create(client: Client) {
        // return await prisma.$transaction()
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
                cli_profilePurchase: {
                    contains: client.profilePurchase
                },
                cli_score: {
                    equals: client.rfmScore
                }
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
