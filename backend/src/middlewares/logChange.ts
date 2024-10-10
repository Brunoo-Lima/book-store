import { Client } from "@prisma/client";
import { Response, Request} from "express";
import { prisma } from "../Config/Database/prisma/prismaClient";
import { LogChange } from "../Model/domain/LogChange";
import { User } from "../Model/domain/User";

export async function log(req: Request, res: Response){
    try{
        const client  = req.body.client as Client
        const user = req.body.user
        const action = (new Date(client.created_at).getTime() !== new Date(client.updated_at).getTime()) ? "Update" : "Create";
        if(!client || !user){
            return res.json({
                error: "Client doesn't send or user is invalid !"
            })
        }
        const userDomain = new User(user.user_email, user.user_password, user.user_password)
        userDomain.id = user.user_id
        const logChange = new LogChange(userDomain, action)

        const log = await prisma.log.create({
            data: {
              log_action: logChange.get_action(),
              created_at:new Date(client.created_at),
              updated_at: new Date(client.updated_at),
              fk_log_use_id: logChange.get_user().id,
              fk_log_cli_id: client.cli_id
            },
          })


        if(!log){
            return res.json({
                error: "Log with error !"
            })
        }
        return res.json({
            log
        })
    } catch(e){
        return res.json({
            error: e
        })
    }
}
