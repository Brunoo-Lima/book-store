import Book from "../domain/Book";
import { IStrategy } from "../interfaces/IStrategy";

export class ValidBookDataDefaults implements IStrategy {
    process(book: Book): void {
        const { status, categoryOfChange, justifyStatus } = book;
        if(!status) book.status = "ACTIVATE"
        if(!categoryOfChange) book.categoryOfChange = "Default"
        if(!justifyStatus) book.justifyStatus = "In stock"
    }
}
