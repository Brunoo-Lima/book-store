import Book from "../Book";
import { IStrategy } from "../interfaces/IStrategy";

export class CheckStock implements IStrategy {
    //This validation can be in the front-end
    process(book: Book): void {
        if(book.quantity < 0) book.quantity = 0;
    }
}
