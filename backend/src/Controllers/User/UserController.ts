import { NextFunction, Request, Response } from "express";
import Facade from "../../domain/Facade/Facade";
import { User } from "../../domain/User";
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

            const entityExist = await facade.findEntity(user);
            if (entityExist) return res.status(400).json({
                error: 'User exist in database !'
            });

            const messages = await facade.save([user]);
            const success = messages.map((message) => message.success);

            messages.forEach((message) => {
                const { error } = message
                if(error) return res.status(400).json({error})
            })

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
                ...success,
                token,
            })
        } catch (err) {
            next(err);
        }
    }
}
