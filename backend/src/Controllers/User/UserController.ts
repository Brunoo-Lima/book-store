import { Request, Response } from "express";
import { Facade } from "../Facade/Facade";
import { User as DomainUser } from "../../Model/domain/User"; // Importa o User do domínio
import { User as PrismaUser } from '@prisma/client'; // Importa o User do Prisma
import { Authentication } from "../Authentication/Authentication";
import { hashSync } from "bcrypt";

export class UserController{
    async handle(req: Request, res: Response){
        try{
            const {email, password} = req.body

            if(!email || !password) return res.json({
                error: "E-mail and Password should be sent !"
            })

            const userDomain = new DomainUser(email, password)
            const facade = new Facade(userDomain)
            const userDatabase = await facade.create() as PrismaUser
            if(!userDatabase) return res.json({
                error: "User cannot be created !"
            })
            
            const token = Authentication.generateToken({
                user_id: userDatabase.use_id,
                user_email: userDatabase.use_email,
                user_password: hashSync(userDatabase.use_password, 3)
            })
            return res.json({
                user: userDatabase,
                token
            })

        } catch (e) {
            return res.json({
                error: `O erro: ${e} foi encontrado :(`
            })
        }
    }
}
