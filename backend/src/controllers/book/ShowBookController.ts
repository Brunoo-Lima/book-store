import { Request, Response } from "express";
import ShowBookService from "../../services/book/ShowBookService";

export default class ShowBookController {
    async handle(req: Request, res: Response){
        const {queryBook} = req.body
        if(!queryBook) throw new Error('You should send the data !')

        const showBookService = new ShowBookService();
        const book = await showBookService.execute(queryBook);

        return res.json(book);
    }
}
