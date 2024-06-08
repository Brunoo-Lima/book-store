import { NextFunction, Request, Response } from "express";
import Facade from "../../domain/Facade/Facade";
import { User } from "../../domain/User";
import { Users } from "@prisma/client";
import { formatString } from "../../utils/formatString";

export class UserController {
    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.body.username as string
            const userFormatted = formatString(username);

            if (!username) throw new Error('You cannot sent empty data !');

            const user = new User(userFormatted);
            const facade = new Facade();
            const newUser = await facade.save(user) as Users;

            user.idEntity = newUser.use_id;
            return res.json({
                user: newUser,
            })
        } catch (e) {
            return res.json(e);
        }
    }
}
