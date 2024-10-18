import { Request, Response } from "express";
import { Facade } from "../Facade/Facade";
import { User } from "../../Model/domain/User"; // Importa o User do domínio
import { User as PrismaUser } from "@prisma/client"; // Importa o User do Prisma
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
export class UserController {
    async handle(req: Request, res: Response) {
        try {
            const { email, password, confirmPassword } = req.body;

            if (!email || !password || password !== confirmPassword)
                return res.json({
                    error: "E-mail and Password should be sent or password do not equals !",
                });

            const hashPassword = hashSync(password, 2);
            const userDomain = new User(email, hashPassword, hashPassword);

            const facade = new Facade();
            const userDatabase = (await facade.create(userDomain)) as PrismaUser;

            if (!userDatabase || "error" in userDatabase)
                return res.json({
                    error: `Error: ${userDatabase.error}`,
                });

            const secret = process.env.TOKEN_SECRET as string;
            const token = jwt.sign(
                {
                    user_id: userDatabase.use_id,
                    user_email: userDatabase.use_email,
                    user_password: userDatabase.use_password,
                },
                secret,
                { expiresIn: "1d" }
            );

            return res.json({
                user: userDatabase,
                token,
            });
        } catch (e) {
            return res.json({
                error: `${e} was found :(`,
            });
        }
    }
}
