import Book from "../domain/Book";
import { IStrategy } from "../interfaces/IStrategy";

//For each validation, I use the strategy to process the
export class AlterPriceValidator implements IStrategy {
    process(book: Book): void {

    }
}
