import { Request, Response } from "express";
import CreateCategoryService from "../../services/category/createCategoryService";
import { CategoryDomain } from "../../domain/CategoryDomain";

export default class CreateCategoryController {
    async handle(req: Request, res: Response) {
        try {
            const categoriesInBody: CategoryDomain = req.body;
            const categoryService = new CreateCategoryService();

            //This will return the "count", the number of categories that have been (foram) created
            const allCategoriesCreated = await categoryService.execute(
                categoriesInBody
            );
            return res.json(allCategoriesCreated);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}
