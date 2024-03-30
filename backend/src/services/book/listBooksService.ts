import BookDAO from "../../dao/book/bookDAO";

class ListBooksService {
    async execute() {
        const bookDao = new BookDAO();

        const books = await bookDao.getListBook();

        return books;
    }
}

export { ListBooksService };
