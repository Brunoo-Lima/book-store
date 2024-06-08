import { NextFunction, Request, Response } from "express";
import Facade from "../../domain/Facade/Facade";
import { User } from "../../domain/User";
import { Users } from "@prisma/client";
import { formatString } from "../../utils/formatString";
import { sign } from "jsonwebtoken";

export class UserController {
    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.body.username as string;

            if (!username) throw new Error("You cannot sent empty data !");

            const userFormatted = formatString(username);
            const user = new User(userFormatted);
            const facade = new Facade();
            const newUser = (await facade.save(user)) as Users;

            user.idEntity = newUser.use_id;

            const tokenSecret = process.env.TOKEN_SECRET;

            if (!tokenSecret) throw new Error("Secret token is not defined");

            const token = sign(
                {
                    use_id: user.idEntity,
                    use_name: user.name,
                },
                tokenSecret
            );

            return res.json({
                user: newUser,
                token,
            });
        } catch (err) {
            next(err);
        }
    }
}
