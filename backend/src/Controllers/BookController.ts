import { Response, Request ,NextFunction} from "express";
import { IBookDTO } from "../domain/interfaces/IBookDTO";

export default class BookController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const bookData: IBookDTO = req.body;

        if(!bookData) throw new Error('You must sent the data !');
        return res.json(bookData);
    }
}
