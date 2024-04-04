import { UserDomain } from "../../domain/UserDomain";
import { prisma } from "../../prisma/prismaClient";

class UserDAO {
    async createUser({ use_name }: UserDomain) {
        return prisma.user.create({
            data: {
                use_name: use_name,
            },
            select: {
                use_id: true,
                use_name: true,
                created_at: true,
            },
        });
    }
}

export default UserDAO;
