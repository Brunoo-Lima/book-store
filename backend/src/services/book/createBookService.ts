import { BookDAO } from "../../dao/book/bookDAO";
import { AuthorDomain } from "../../domain/Author";
import BookDomain from "../../domain/Book";
import { CategoryDomain } from "../../domain/Category";
import { BookDTO } from "../../types/types";

export default class CreateBookService {
    //Returns "BookDTO" because I don't know what it returned in "req.body", but I can force
    //that it returns the properties needed to create the book
    async execute(bookDataBody: BookDTO) {
        const bookDAO = new BookDAO();

        //Creates an array of "Category" and "AuthorDomains"
        const authorsDomain = Array.isArray(bookDataBody.authors) ?
            bookDataBody.authors.map((aut) => new AuthorDomain({ name: aut.toUpperCase() })) : [];
        const categoriesDomain = Array.isArray(bookDataBody.categories) ?
            bookDataBody.categories.map((cte) => new CategoryDomain(cte.toUpperCase())) : [];

        const bookDomain = BookDomain.createBook({
            ...bookDataBody,
            authors: authorsDomain,
            categories: categoriesDomain,
        });

        const thisBookExist = await bookDAO.findFirstBook(bookDomain);
        if (thisBookExist) throw new Error('Book already exist !');

        const book = await bookDAO.createBook(bookDomain);

        return book;

    }
}


