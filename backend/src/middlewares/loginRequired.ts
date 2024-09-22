import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'
import {ICustomJwt} from '../interfaces/ICustomJWT'
import { Facade } from '../Facade/Facade'
import { ClientFactory } from '../domain/Client'
import { Client } from '@prisma/client'

export async function login(req: Request, res: Response, next: NextFunction){
    try{
        const { authorization } = req.headers
        if(!authorization) return res.status(401).json({
            error: "Login is required"
        })
        const [, token] = authorization.split(' ')
        const client = jwt.verify(token, process.env.TOKEN_SECRET as string)
        const { clientEmail, clientPassword } = client as ICustomJwt
        const clientVerify = ClientFactory.createClient(clientEmail, clientPassword)
        const clientExist = await new Facade(clientVerify).find() as Client
        if(!clientExist){
            return res.status(401).json({
                error: "Client don't exist or password cannot be equals!"
            })
        }
        // req.email = email;
        // req.passwordClient = password;
        // req.clientId = clientExist.cli_id;
        return next()
    } catch (error){
        return res.status(403).json({
            error
        })
    }
}
