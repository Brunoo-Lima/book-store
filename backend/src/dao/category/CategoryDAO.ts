import { CategoryDomain } from "../../domain/Category";
import { prisma } from "../../prisma/prismaClient";

export default class CategoryDAO {

    public async createCategory(categoryData: CategoryDomain[]) {
        const categories: Object[] = []
        //Check if the authors' names exist in the database
        for (const category of categoryData) {
            const categoriesExist = await prisma.category.findFirst({
                where: {
                    cte_name: category.name,
                }
            })
            //If exist, return the data created
            if (categoriesExist) {
                categories.push(categoriesExist);
                continue; //This goes to the next iteration
            }
            const newCategory = await prisma.category.create({
                data: {
                    cte_name: category.name
                },
                select: {
                    cte_id: true,
                    cte_name: true
                }
            });
            categories.push(newCategory);
        }
        return categories;
    }
    public async findManyCategory() {
        return prisma.category.findMany();
    }
    public static async findManyCategoriesId(categories: CategoryDomain[]){
        const categoriesIds: string[] = []
        categories.map(async (category) => {
            const categoryId = await prisma.category.findFirst({
                where: {
                    cte_name: category.name,
                }
            })
            if(categoryId) categoriesIds.push(categoryId.cte_id);
        })
        return categoriesIds;
    }

}
