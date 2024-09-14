/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityDomain } from "../../domain/EntityDomain";
import { User } from "../../domain/User";
import { prisma } from "../../prisma/prismaClient";
import { DAO } from "./DAO";

export class UserDao implements DAO{
    public async create(user: User): Promise<unknown> {
        return await prisma.user.create({
            data: {
                use_id: user.id,
                use_name: user.name
            }
        })
    }
    public update(entity: EntityDomain): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    public delete(entity: EntityDomain): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    public async find(user: User): Promise<unknown> {
        return await prisma.user.findFirst({
            select: {
                use_id: true,
                use_name: true,
            },
            where: {
                use_name: user.name
            }
        })
    }

}
