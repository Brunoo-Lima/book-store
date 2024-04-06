import BookDAO from "../../dao/book/bookDAO";
import BookDomain from "../../domain/Book";
import { BookDTO } from "../../DTO/BookDTO";

class CreateBookService {
    async execute(bookData: BookDTO) {
        const {author} = bookData;
        const bookDAO = new BookDAO();
        const bookDomain = new BookDomain();

        const bookAlreadyExists = await bookDAO.findFirstBook(bookDomain);
        if (bookAlreadyExists) throw new Error(`Book already exists`);

        const createBook = await bookDAO.createBook(bookDomain);

        return bookDomain;
    }
}

export { CreateBookService };
