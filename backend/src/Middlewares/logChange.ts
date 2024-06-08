import { Response } from "express";
import { CustomRequest } from "../interfaces/ICustomRequest";
import { LogChange } from "../domain/LogChange";
import Facade from "../domain/Facade/Facade";
import Book from "../domain/Book";
import { Books, Logs_Change } from "@prisma/client";
import { User } from "../domain/User";

export async function logChange(req: CustomRequest, res: Response){
    try{
        const { log_change } = req;
        const { entity }=  req.user;

        if(!log_change) return res.status(400).json('Error logs does not sent !');
        const bookDomain = log_change.bookDomain as Book;
        const bookCreated = log_change.bookCreated as Books;

        const facade = new Facade();
        const logChange = new LogChange(bookDomain, entity as User);
        const log = await facade.save(logChange) as Logs_Change;
        logChange.idEntity = log.log_id;
    
        return res.json({
            book: bookCreated,
            logChange: log
        });
    } catch (e) {
        return res.status(400).json(e)
    }
}
