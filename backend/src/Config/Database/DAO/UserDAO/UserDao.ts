/* eslint-disable @typescript-eslint/no-unused-vars */
import { IDao } from "../../../../interfaces/IDao";
import { EntityDomain } from "../../../../Model/entities/EntityDomain";
import { User } from "../../../../Model/entities/User";
import { prisma } from "../../prisma/prismaClient";
export class UserDao implements IDao{
    public async create(user: User): Promise<unknown> {
        return await prisma.user.create({
            data: {
                use_id: user.id,
                use_email: user.getEmail(),
                use_password: user.getPassword(),
                use_is_admin: true
            },
            select: {
                use_email: true,
                use_id: true,
                use_password: true
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
                use_email: true,
                use_password: true,
                use_id: true
            },
            where: {
                use_email: user.getEmail()
            }
        })
    }
    public findMany(entity: EntityDomain): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

}
