import EntityDomain from "../domain/EntityDomain";
import { IDao } from "../interfaces/IDao";
import User from "../domain/User";
import { prisma } from "../prisma/prismaClient";

export default class UserDao implements IDao{
    async create(user: User){
        return await prisma.user.create({
            data: {
                use_id: user.idEntity,
                use_name: user.name,
                created_at: user.dateCreate,
                updated_at: user.dateUpdate,
            }
        })
    }
    async update(user: User) {
        return await prisma.user.update({
            data: {
                use_name: user.name,
                updated_at: user.dateUpdate,
            },
            where: {
                use_id: user.idEntity,
            }
        });
    }
    async findUnique(user: User): Promise<Object | null>{
        return await prisma.user.findUnique({
            where: {
                use_id: user.idEntity,
            }
        })
    }
    async inactivate(user: User) {
        return await prisma.user.delete({
            where: {
                use_id: user.idEntity,
            }
        })
    }
}
