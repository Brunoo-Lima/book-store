import {BookDAO} from "../../dao/book/bookDAO";

class ListBooksService {
    async execute() {
        const bookDao = new BookDAO();
    }
}

export { ListBooksService };
