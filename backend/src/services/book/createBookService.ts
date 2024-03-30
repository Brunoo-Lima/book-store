import BookDAO, { BookData } from "./../../dao/book/bookDAO";

class CreateBookService {
    async execute(bookData: BookData) {
        const bookDAO = new BookDAO();

        const bookAlreadyExists = await bookDAO.findFirstBook(bookData);

        if (bookAlreadyExists?.title) throw new Error(`Book already exists`);

        const book = await bookDAO.createBook(bookData);

        return { book };
    }
}

export { CreateBookService };
