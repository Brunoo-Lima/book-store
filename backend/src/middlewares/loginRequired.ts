import jwt from 'jsonwebtoken'
import { Response, Request } from 'express'
import {ICustomJwt} from '../interfaces/ICustomJWT'
import { Facade } from '../Facade/Facade'
import { ClientFactory } from '../domain/Client'
import { compareSync } from 'bcrypt'
import { Client } from '@prisma/client'

export async function login(req: Request, res: Response){
    try{
        const { authorization } = req.headers
        if(!authorization) return res.status(401).json({
            error: "Login is required"
        })
        const [, token] = authorization.split(' ')
        const client = jwt.verify(token, process.env.TOKEN_SECRET as string)
        const { email, password } = client as ICustomJwt
        const clientVerify = ClientFactory.createClient(email, password)
        const clientExist = await new Facade(clientVerify).find() as Client

        if(!clientExist || !compareSync(password, clientExist.cli_password)){
            return res.status(401).json({
                error: "Client don't exist or password cannot be equals!"
            })
        }
        // req.email = email;
        // req.passwordClient = password;
        // req.clientId = clientExist.cli_id;
        return res.json({
            token,
            message: "Success !"
        })
    } catch (error){
        return res.status(403).json({
            error
        })
    }
}
