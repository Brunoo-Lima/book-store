import { Request, Response, NextFunction } from "express";
import { bookDTO } from "../../Model/entities/Book/DTO/bookDTO";
import { FactoryBook } from "../../Model/entities/Book/Book";
import { Facade } from "../Facade/Facade";

export class BookController {
    async handle(req: Request, res: Response, next: NextFunction){
        try{
            const bookDTO = req.body as bookDTO
            const entityBook = FactoryBook.createBook(bookDTO)
            const facade = new Facade()

            const bookCreated = await facade.create(entityBook)

            return res.json(bookCreated)

        } catch(e) {
            return res.json({
                "Error": e
            })
        }
    }

}
