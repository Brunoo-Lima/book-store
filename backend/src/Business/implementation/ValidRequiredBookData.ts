import Book from "../../domain/Book";
import { ErrorValidationsException } from "../../domain/Errors/ErrorValidationsException";
import { IStrategy } from "../../interfaces/IStrategy";

export class ValidRequiredBookData implements IStrategy {
    private message: string | undefined;
    public process(book: Book): void | string {
        this.message = `Data are required!`;
        for (const [ key ] of Object.keys(book)) {
            if(key === 'status' || 'justifyStatus' || 'categoryOfChange') continue;
            return this.message;
        }
    }
}
