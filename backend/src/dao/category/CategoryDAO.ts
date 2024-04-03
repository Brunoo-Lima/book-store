import { prisma } from "../../prisma/prismaClient";

export interface CategoryData {
    categories: [
        {cte_name: string}
    ]
}

export default class CategoryDAO {
    //Create various categories
    async createCategory(categoryData: CategoryData){
        return prisma.category.createMany({
            data: categoryData.categories,
        })
    }
    //Return all the categories in database
    async findManyCategory(){
        return prisma.category.findMany()
    }
}
