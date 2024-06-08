import Jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { User } from "../../domain/User";
import Facade from "../../domain/Facade/Facade";
import { Users } from "@prisma/client";
import { formatString } from "../../utils/formatString";
import { CustomRequest } from "../../interfaces/ICustomRequest";

export class TokenController {
    public async store(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const username = req.body.username as string
            const userFormatted = formatString(username);
            if (!userFormatted) {
                return res.status(401).json({
                    error: ['Credentials invalid !']
                })
            }
            const user = new User(userFormatted);
            const facade = new Facade();
            const userExist = await facade.findEntity(user);

            if (!userExist) {
                return res.status(401).json({
                    error: ['User was not found !']
                })
            }
            const { use_id, use_name } = userExist as Users;
            const token = Jwt.sign({
                use_id,
                use_name
            }, process.env.TOKEN_SECRET!);
            //It's "NEXT"
            req.user = {
                token,
                use_id,
                use_name
            }
            res.json({
                token
            });
            return next();
        } catch (e) {
            return res.status(401).json({
                error: e
            })
        }
    }
}
