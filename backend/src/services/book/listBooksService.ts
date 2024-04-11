import {BookDAO} from "../../DAO/book/bookDAO";

class ListBooksService {
    async execute() {
        const bookDao = new BookDAO();
    }
}

export { ListBooksService };
