import { Author } from "../domain/Author";
import EntityDomain from "../domain/EntityDomain";
import { IDao } from "../interfaces/IDao";
import { prisma } from "../prisma/prismaClient";

export class AuthorDao implements IDao {
    async create(author: Author) {
        return await prisma.authors.create({
            data: {
                aut_id: author.idEntity as string,
                aut_name: author.nameIs,
                created_at: new Date(author.dateCreate),
                updated_at: new Date(author.dateUpdate),
            }
        });
    }

    async update(author: Author): Promise<Object | null> {
        return await prisma.authors.update({
            data: {
                aut_name: author.nameIs
            },
            where: {
                aut_id: author.idEntity,
            }
        })
    }

    async find(author: Author): Promise<Object | null> {
        return await prisma.authors.findFirst({
            where: {
                aut_name: author.nameIs,
            }
        });
    }

    async inactivate(entity: EntityDomain): Promise<Object | null> {
        throw new Error("Method not implemented.");
    }
}
