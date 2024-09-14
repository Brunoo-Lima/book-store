import jwt from 'jsonwebtoken'
import { Response } from 'express'
import {ICustomJwt} from '../interfaces/ICustomJWT'
import { Facade } from '../Facade/Facade'
import { User } from '../domain/User'
import { ICustomRequest } from '../interfaces/ICustomRequest'


export async function login(req: ICustomRequest, res: Response){
    const { authorization } = req.headers
    if(!authorization) return res.status(401).json({
        error: "Login is required"
    })
    const [, token] = authorization.split(' ')
    try{
        const user = jwt.verify(token, process.env.TOKEN_SECRET as string)
        const { use_id, use_name } = user as ICustomJwt
        const userVerify = new User(use_name)
        const userExist = new Facade(userVerify).find(userVerify)

        req.userId = use_id;
        req.username = use_name;

        if(!userExist){
            return res.status(401).json({
                error: "User does't exist !"
            })
        }
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
