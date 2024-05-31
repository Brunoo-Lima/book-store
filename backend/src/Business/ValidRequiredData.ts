import Book, { BookProps } from "../domain/Book";
import { ErrorValidationsException } from "../domain/Errors/ErrorValidationsException";
import { IStrategy } from "../interfaces/IStrategy";

export class ValidRequiredData implements IStrategy{
    process(book: Book) {
        for(const value of Object.values(book)){
            if(!value) throw new ErrorValidationsException('Data are required !');
        }
    }
}
