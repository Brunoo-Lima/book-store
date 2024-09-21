import { Response, Request} from "express";

export function log(req: Request, res: Response){
    return res.json(
        req.body.client
    )
}
