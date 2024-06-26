import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import Facade from "../domain/Facade/Facade";
import { User } from "../domain/User";
import { CustomRequest } from "../interfaces/ICustomRequest";
import { CustomJwt } from "../interfaces/ICustomJwt";

export default async function loginRequired(
    req: CustomRequest,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            error: ["Login is required !"],
        });
    }
    const [, token] = authorization.split(" ");

    if (!token) {
        return res.status(401).json({
            error: ["Token not provided!"],
        });
    }

    try {
        const tokenSecret = process.env.TOKEN_SECRET;

        if (!tokenSecret) throw new Error("Token secret not defined!");

        const data = jwt.verify(token, tokenSecret);

        const { use_id, use_name } = data as CustomJwt;
        const facade = new Facade();

        const user = new User(use_name);
        user.idEntity = use_id;

        const userExist = await facade.findEntity([user]);
        if (!userExist) {
            return res.status(401).json({
                error: "User does not exist!",
            });
        }
        req.user = {
            entity: user,
        };

        return next();
    } catch (e) {
        return res.status(401).json({ error: "Token não é válido" });
    }
}
