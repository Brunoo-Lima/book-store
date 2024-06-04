import { IDao } from "../interfaces/IDao";
import { User } from "../domain/User";
import { prisma } from "../prisma/prismaClient";

export default class UserDao implements IDao {
    async create(user: User) {
        return await prisma.users.create({
            data: {
                use_name: user.name,
                created_at: new Date(user.dateCreate),
                updated_at: new Date(user.dateUpdate),
            }
        })
    }
    async update(user: User) {
        return await prisma.users.update({
            data: {
                use_name: user.name,
                updated_at: user.dateUpdate,
            },
            where: {
                use_id: user.idEntity!,
            }
        });
    }
    async find(user: User): Promise<Object | null> {
        return await prisma.users.findFirst({
            where: {
                use_name: user.name,
            }
        })
    }
    async inactivate(user: User) {
        return await prisma.users.delete({
            where: {
                use_id: user.idEntity!,
            }
        })
    }
}
