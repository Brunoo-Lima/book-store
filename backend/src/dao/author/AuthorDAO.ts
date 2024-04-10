import { AuthorDomain } from "../../domain/Author";
import { prisma } from "../../prisma/prismaClient";

export default class AuthorDAO {
    public async createAuthorOrFind(authorData: AuthorDomain[]) {
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
    public static async getOrCreateAuthorID (authors: AuthorDomain[]) {
        const authorsIds: string[] = []
        for (const author of authors) {
            const authorExist = await prisma.author.findFirst({
                where: {
                    aut_name: author.name
                }
            })
            if (authorExist){
                authorsIds.push(authorExist.aut_id);
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
            authorsIds.push(newAuthor.aut_id);
        }
        return authorsIds;
    }
}
