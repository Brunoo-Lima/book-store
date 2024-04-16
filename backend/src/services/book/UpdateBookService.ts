import { BookDAO } from "../../dao/book/bookDAO";
import { BookDTO } from "../../types/types";

export default class UpdateBookService {
    async execute(dataUpdated: BookDTO){
        const bookDao = new BookDAO;
    }
}
