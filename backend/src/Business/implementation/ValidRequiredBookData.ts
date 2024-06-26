import Book from "../../domain/Book";
import { IStrategy } from "../../interfaces/IStrategy";

export class ValidRequiredBookData implements IStrategy {
    private message!: string;

    public process(book: Book): void | string {
        this.message = `Data are required!`;
        for (const [ key ] of Object.keys(book)) {
            if(key === 'status' || 'justifyStatus' || 'categoryOfChange') continue;
            return this.message;
        }
    }
}
