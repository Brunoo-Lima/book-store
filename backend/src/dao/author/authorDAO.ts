import { prisma } from "../../prisma/prismaClient";

export interface AuthorData {
    aut_name: string;
}

class AuthorDAO {
    async createAuthor({ aut_name }: AuthorData) {
        return prisma.author.create({
            data: {
                aut_name: aut_name,
            },
            select: {
                aut_id: true,
                aut_name: true,
            },
        });
    }

    async findFirstAuthor({ aut_name }: AuthorData) {
        return prisma.author.findFirst({
            where: {
                aut_name: aut_name,
            },
        });
    }
}

export default AuthorDAO;
