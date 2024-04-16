import { Response, Request } from "express";
import UpdateBookService from "../../services/book/UpdateBookService";
import { BookDTO } from "../../types/types";

export default class UpdateBookController{
    async handle (req: Request, res: Response){
        const { dataToUpdate } = req.body;

        if(!dataToUpdate) throw new Error('The data cannot empty !');
        const updateBookService = new UpdateBookService();
        const bookUpdated = await updateBookService.execute(dataToUpdate as BookDTO);

        return { bookUpdated }
    }
}
