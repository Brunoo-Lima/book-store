import BookDAO from "../../dao/book/bookDAO";
import { BookDomain } from "../../domain/BookDomain";

class CreateBookService {
    async execute(bookData: BookDomain) {
        const bookDAO = new BookDAO();

        const bookAlreadyExists = await bookDAO.findFirstBook(bookData);
        if (bookAlreadyExists) throw new Error(`Book already exists`);

        const createBook = await bookDAO.createBook(bookData);

        return { createBook };
    }
}

export { CreateBookService };
