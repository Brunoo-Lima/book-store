import UserDomain from "../../domain/User";
import { prisma } from "../../prisma/prismaClient";

class UserDAO {
    async createUser({ name }: UserDomain) {
        return prisma.user.create({
            data: {
                use_name: name,
            },
            select: {
                use_id: true,
                use_name: true,
            },
        });
    }
}

export default UserDAO;
