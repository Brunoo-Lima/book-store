import Book from "../domain/Book";
import { IDao } from "../domain/interfaces/IDao";

export default class BookDao implements IDao{

    findUnique(book: Book): Promise<Object | null> {
        throw new Error("Method not implemented.");
    }
    create(entity: Book): void {

    }
    update(entity: Book): void {
        throw new Error("Method not implemented.");
    }
    delete(entity: Book): void {
        throw new Error("Method not implemented.");
    }

}
