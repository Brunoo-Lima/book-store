import CategoryDAO from "../../dao/category/CategoryDAO";
import { CategoryDomain } from "../../domain/CategoryDomain";

export default class CreateCategoryService {
    async execute(categoryData: CategoryDomain) {
        const categoryDAO = new CategoryDAO();

        const categoryExists = await categoryDAO.findManyCategory();

        //This needs to be more perfomatic
        //Verify if the category already in database
        for (let category of categoryData.categories) {
            const { cte_name } = category;
            if (categoryExists.some((value) => value["cte_name"] === cte_name))
                throw new Error("Categories already exists !");
        }

        const categoryCreated = await categoryDAO.createCategory(categoryData);

        return categoryCreated;
    }
}
