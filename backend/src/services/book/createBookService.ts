import {BookDAO} from "../../dao/book/bookDAO";
import { AuthorDomain } from "../../domain/Author";
import BookDomain from "../../domain/Book";
import { CategoryDomain } from "../../domain/Category";
import { BookDTO } from "../../DTO/bookDTO";

class CreateBookService {
    //Returns "BookDTO" because I don't know what it returned in "req.body", but I can force
    //that it returns the properties needed to create the book
    async execute(bookDataBody: BookDTO) {
        const bookDAO = new BookDAO();

        //Creates an array of "Category" and "AuthorDomains"
        //ESTÁ RETORNANDO UNDEFINED
        const authorsDomain = bookDataBody.authors.map((aut) => new AuthorDomain({name: aut}));
        const categoriesDomain = bookDataBody.categories.map((cte) => new CategoryDomain(cte));
        const bookDomain = BookDomain.createBook({
            ...bookDataBody,
            authors: authorsDomain,
            categories: categoriesDomain,
        });

        const thisBookExist = await bookDAO.findFirstBook(bookDomain);
        if(thisBookExist) throw new Error ('Book already exist !');

        const book = await bookDAO.createBook(bookDomain);

        return book;

    }
}

export { CreateBookService };
