import { Response, NextFunction } from "express";
import UpdateBookService from "../../services/book/UpdateBookService";
import { BookDTO } from "../../types/types";
import { CustomRequest } from "./CreateBookController";

//Partially resolved, it need of validation to "Authors" and "Categories", Is necessary ?
export default class UpdateBookController{
    async handle (req: CustomRequest, res: Response, next: NextFunction){
        const { dataToUpdate } = req.body;

        if(!dataToUpdate) throw new Error('The data cannot empty !');
        const updateBookService = new UpdateBookService();

        const bookUpdated = await updateBookService.execute(dataToUpdate as BookDTO);
        const { boo_id, boo_justify_status} = bookUpdated;
        req.logsChange = {
            boo_id,
            userId: req.userId,
            description: boo_justify_status,
        }
        return next();
    }
}
