import { NextFunction, Request, Response } from "express";
import  CreateUserService  from "../../services/user/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { userName } = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute(userName);
        return res.json(user);
    }
}

export default CreateUserController ;
