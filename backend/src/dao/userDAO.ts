import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
            },
        });
    }
}

export default UserDAO;
