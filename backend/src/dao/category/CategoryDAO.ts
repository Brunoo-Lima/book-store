import { CategoryDomain } from "../../domain/CategoryDomain";
import { prisma } from "../../prisma/prismaClient";

export default class CategoryDAO {
    async createCategory(categoryData: CategoryDomain) {
        return prisma.category.createMany({
            data: categoryData.categories,
        });
    }

    async findManyCategory() {
        return prisma.category.findMany();
    }
}
