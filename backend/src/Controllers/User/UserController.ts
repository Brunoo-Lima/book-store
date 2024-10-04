import { Request, Response } from "express";
import { Facade } from "../Facade/Facade";
import { User } from "../../Model/domain/User"; // Importa o User do domínio
import { User as PrismaUser } from '@prisma/client'; // Importa o User do Prisma
import { hashSync } from "bcrypt";

export class UserController{
    async handle(req: Request, res: Response){
        try{
            const {email, password, confirmPassword } = req.body

            if(!email || !password || password !== confirmPassword) return res.json({
                error: "E-mail and Password should be sent or password do not equals !"
            })

            const hashPassword = hashSync(password, 2);
            const userDomain = new User(email, hashPassword, hashPassword)

            const facade = new Facade(userDomain)
            const userDatabase = await facade.create() as PrismaUser

            if(!userDatabase || "error" in userDatabase) return res.json({
                error: `Error: ${userDatabase.error}`
            })

            return res.json({
                user: userDatabase,
            })

        } catch (e) {
            return res.json({
                error: `${e} was found :(`
            })
        }
    }
}
