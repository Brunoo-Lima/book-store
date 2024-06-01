import { IStrategy } from "../interfaces/IStrategy";
import Book from "../domain/Book";

export class ValidGrpPricing implements IStrategy{
    process(book: Book ): void {
        return;
    }
}
