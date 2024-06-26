import Book from "../../domain/Book";
import { IStrategy } from "../../interfaces/IStrategy";

export class ValidBookDataDefaults implements IStrategy {
    public process(book: Book) {
        const { boo_status, boo_category_change, boo_justify_status } = book;
        if(!boo_status) book.boo_status = "ACTIVATE";
        if(!boo_category_change) book.boo_category_change = "Default";
        if(!boo_justify_status) book.boo_justify_status = "In stock";
    }
}
