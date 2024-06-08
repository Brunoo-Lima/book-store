import { Request } from "express"

//Only to create new keys in request
export interface CustomRequest extends Request {
    [key: string]: any
}
