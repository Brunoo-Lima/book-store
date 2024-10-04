import { Request, Response } from "express";
import { Facade } from "../Facade/Facade";
import { User } from "../../Model/domain/User"; // Importa o User do domínio
import { User as PrismaUser } from '@prisma/client'; // Importa o User do Prisma
import { Authentication } from "../Authentication/Authentication";


export class UserController{
    async handle(req: Request, res: Response){
        try{
            const {email, password, confirmPassword } = req.body

            if(!email || !password) return res.json({
                error: "E-mail and Password should be sent !"
            })

            const userDomain = new User(email, password, confirmPassword)
            const facade = new Facade(userDomain)
            const userDatabase = await facade.create() as PrismaUser

            if(!userDatabase || "error" in userDatabase) return res.json({
                error: `Error: ${userDatabase.error}`
            })

            const token = Authentication.generateToken({
                user_id: userDatabase.use_id,
                user_email: userDatabase.use_email,
                user_password: userDatabase.use_password
            })
            return res.json({
                user: userDatabase,
                token
            })

        } catch (e) {
            return res.json({
                error: `${e} was found :(`
            })
        }
    }
}
