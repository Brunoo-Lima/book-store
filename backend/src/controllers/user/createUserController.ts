import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/createUserService";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { use_name } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ use_name });

        return res.json(user);
    }
}

export { CreateUserController };
