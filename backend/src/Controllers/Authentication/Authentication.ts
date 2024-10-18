/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../Model/domain/User";
import { Facade } from "../Facade/Facade";
import { User as PrismaUser } from "@prisma/client";
import { compareSync } from "bcrypt";

export class Authentication {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(401).json({
                    error: "E-mail and Password should be sent or password do not equals !",
                });
            }

            const user = new User(email, password, password);
            const facade = new Facade();
            const userExist = (await facade.find(user)) as PrismaUser;

            if (!userExist)
                return res.json({
                    error: "User not found in database !",
                });

            const comparePassword = compareSync(
                password,
                userExist.use_password
            );

            if (!comparePassword) {
                return res.status(401).json({
                    error: "E-mail or password is incorrect !",
                });
            }

            const secret = process.env.TOKEN_SECRET as string;

            const token = jwt.sign(
                {
                    user_id: userExist.use_id,
                    user_email: userExist.use_email,
                    user_password: userExist.use_password,
                },
                secret,
                { expiresIn: "1d" }
            );

            return res.json({
                token,
            });
        } catch (e) {
            return res.json({
                error: `This ${e} was found !`,
            });
        }
    }
}
