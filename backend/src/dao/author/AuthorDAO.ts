import { AuthorDomain } from "../../domain/Author";
import { prisma } from "../../prisma/prismaClient";

export default class AuthorDAO {
    public async createAuthor(authorData: AuthorDomain[]) {
        const authors: Object[] = []; //Only initialize the type
        for (const author of authorData) {

            const authorExist = await this.findFirstAuthor(author);
            if (authorExist){
                authors.push(authorExist);
                continue;
            }

            const newAuthor = await prisma.author.create({
                data: {
                    aut_name: author.name
                },
                select: {
                    aut_id: true,
                    aut_name: true,
                }
            })
            authors.push(newAuthor);
        }
        return authors;
    }
    public async findFirstAuthor(authorData: AuthorDomain) {
        return await prisma.author.findFirst({
            where: {
                aut_name: authorData.name
            }
        })
    }
    public static async findManyAuthorsIDs (author: AuthorDomain[]) {
        const getAuthorsIds: string[] = []
        author.map(async (aut) => {
            const authorId = await prisma.author.findFirst({
                where: {
                    aut_name: aut.name,
                }
            })
            if(authorId) getAuthorsIds.push(authorId.aut_id);
        })
        return getAuthorsIds;
    }
}
