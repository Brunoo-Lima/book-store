import { Category } from "../domain/Category";
import EntityDomain from "../domain/EntityDomain";
import { IDao } from "../interfaces/IDao";
import { prisma } from "../prisma/prismaClient";

export class CategoryDao implements IDao {
    async create(category: Category) {
        return await prisma.categories.create({
            data: {
                cte_name: category.name,
                created_at: new Date(category.dateCreate),
                updated_at: new Date(category.dateUpdate),
            }
        });
    }
    update(entity: EntityDomain): Promise<Object | null> {
        throw new Error("Method not implemented.");
    }
    async find(category: Category): Promise<Object | null> {
        return await prisma.categories.findFirst({
            where: {
                cte_name: category.name
            }
        })
    }
    inactivate(entity: EntityDomain): Promise<Object | null> {
        throw new Error("Method not implemented.");
    }
}
