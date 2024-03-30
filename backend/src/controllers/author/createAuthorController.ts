import { Request, Response } from "express";
import { CreateAuthorService } from "../../services/author/createAuthorService";

class CreateAuthorController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;

        const createAuthorService = new CreateAuthorService();

        const createAuthor = await createAuthorService.execute({ name });

        return res.json(createAuthor);
    }
}

export { CreateAuthorController };
