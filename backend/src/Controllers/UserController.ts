import { Request, Response } from "express";

export class UserController {
    async handle(req: Request, res: Response){
        try{
            const { dataUser } = req.body
            if(dataUser) throw new Error('You cannot sent empty data !');
        }catch(e) {
            return res.json(e);
        }
    }
}
