import Book from "../domain/Book";
import { ErrorValidationsException } from "../domain/Errors/ErrorValidationsException";
import { IStrategy } from "../interfaces/IStrategy";

export class ValidRequiredBookData implements IStrategy {

    public process(book: Book) {
        
        for (const [ key ] of Object.keys(book)) {
            if(key === 'status' || 'justifyStatus' || 'categoryOfChange') continue;
            throw new ErrorValidationsException(`Data are required!`);
        }
    }
}
