import { Response } from "express";
import { CustomRequest } from "../interfaces/ICustomRequest";
import { LogChange } from "../domain/LogChange";
import Facade from "../domain/Facade/Facade";
import Book from "../domain/Book";
import { Books, Logs_Change } from "@prisma/client";
import { User } from "../domain/User";

export async function logChange(req: CustomRequest, res: Response){
    try{
        if(!req.user.entity || !req.bookDomain || !req.created) return res.status(400).json({
            error: ['Something went wrong !']
        })
        const user =  req.user.entity as User;
        const book = req.bookDomain as Book;
        const logChange = new LogChange(book, user);
        const facade = new Facade();
        const log = await facade.save([logChange]);

        return res.json({
            book: book,
            logChange: log
        });
    } catch (e) {
        return res.status(400).json(e)
    }
}
