import { BookDAO } from "../../dao/book/bookDAO";
import { BookDTO } from "../../types/types";
import ValidObjectBook from "../../utils/ValidObjects";

export default class UpdateBookService {
    async execute(dataUpdated: BookDTO){
        if(!dataUpdated) throw new Error('You should send the data to update !');
        const bookDao = new BookDAO();
        const bookExist = await bookDao.findFirstBook(dataUpdated.title);

        if(!bookExist) throw new Error('You should update an existing book !');

        const formattedDataBook = ValidObjectBook.removeValuesUndefined(dataUpdated);
        const bookUpdated = await bookDao.updateFirstBook(formattedDataBook);

        return bookUpdated;
    }
}
