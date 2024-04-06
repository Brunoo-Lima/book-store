import CategoryDAO from "../../dao/category/CategoryDAO";
import CategoryDomain from "../../domain/Category";

export default class CreateCategoryService {
    async execute(categoryData: string[]) {
        const categoryDAO = new CategoryDAO();
        const categoryDomain = new CategoryDomain(categoryData);
        const categoryExists = await categoryDAO.findManyCategory();

        //This needs to be more perfomatic
        //Verify if the category already in database
        for (let category of categoryData) {
            if (categoryExists.some((value) => value["cte_name"] === category))
                throw new Error("Categories already exists !");
        }

        const categoryCreated = await categoryDAO.createCategory(categoryDomain);

        return categoryCreated;
    }
}
