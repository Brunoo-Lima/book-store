import Author from "../../domain/Author";
import { prisma } from "../../prisma/prismaClient";

export default class AuthorDAO {
    public createAuthor (authorData: Author) {
        return prisma.author.create({
            data: {
                aut_name: authorData.name
            },
            select: {
                aut_id: true,
                aut_name: true,
            }
        })
    }
    public findFirstAuthor (authorData: Author) {
        return prisma.author.findFirst({
            where: { aut_name: authorData.name }
        })
    }
    public async checkExistAuthor(authorName: string): Promise<boolean>{
        const author = await prisma.author.findFirst({
            where: {aut_name: authorName}
        })
        return author ? true : false;
    }
}
