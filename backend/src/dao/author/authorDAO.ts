import { prisma } from "../../prisma/prismaClient";

interface AuthorData {
    name: string;
}

class AuthorDAO {
    async createAuthor({ name }: AuthorData) {
        return prisma.author.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            },
        });
    }

    async findFirstAuthor({ name }: AuthorData) {
        return prisma.author.findFirst({
            where: {
                name: name,
            },
        });
    }
}

export default AuthorDAO;
