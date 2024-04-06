import Category from "../../domain/Category";
import { prisma } from "../../prisma/prismaClient";

export default class CategoryDAO {
    async createCategory(categoryData: Category) {
        return prisma.category.createMany({
            data: categoryData.category.map(function(category){
                return {
                    cte_name: category
                }
            })
        });
    }

    async findManyCategory() {
        return prisma.category.findMany();
    }
}
