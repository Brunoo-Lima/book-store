import { NextFunction, Request, Response } from "express";
import Facade from "../../domain/Facade/Facade";
import { User } from "../../domain/User";
import { sign } from "jsonwebtoken";
import { Users } from "@prisma/client";

export class UserController {
    async store(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.body.username as string;

            if (!username) throw new Error("You cannot send empty data!");

            const user = new User(username.toUpperCase());
            const facade = new Facade();

            const messages = await facade.save([user]);

            for (const message of messages) {
                if (message.error) {
                    return res.status(400).json({ error: message.error });
                }
            }

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
                success: true,
                token
            });
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.body.username as string;
            const user = new User(username.toUpperCase());
            const facade = new Facade();
            const userExist = await facade.findEntity([user]) as Users | null;

            if (!userExist) {
                return res.status(404).json({
                    error: 'User cannot be found!'
                });
            }

            return res.json({
                user: userExist,
            });
        } catch (e) {
            next(e);
        }
    }
}
