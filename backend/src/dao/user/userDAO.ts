import { prisma } from "../../prisma/prismaClient";

interface UserData {
    name: string;
}

class UserDAO {
    async createUser({ name }: UserData) {
        return prisma.user.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
                created_at: true,
            },
        });
    }
}

export default UserDAO;
