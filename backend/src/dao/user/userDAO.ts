import UserDomain from "../../domain/User";
import { prisma } from "../../prisma/prismaClient";

class UserDAO {
    async createUser({ name }: UserDomain) {
        const userExist = await this.findUserByName(name)
        if(userExist) return userExist;

        return await prisma.user.create({
            data: {
                use_name: name,
            },
            select: {
                use_id: true,
                use_name: true,
            },
        });
    }
    async findUserByName(name: string){
        return prisma.user.findFirst({
            where: {
                use_name: name,
            }
        });
    }
    static async findUser(name:string, id:string){
        return prisma.user.findFirst({
            where: {
                use_id: id,
                AND: {
                    use_name: name,
                }
            }
        })
    }
}

export default UserDAO;
