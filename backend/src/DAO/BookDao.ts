import Book from "../domain/Book";
import EntityDomain from "../domain/EntityDomain";
import { IDao } from "../domain/interfaces/IDao";

export default class BookDao implements IDao{
    create(entity: EntityDomain): Promise<Object | null> {
        throw new Error("Method not implemented.");
    }
    update(entity: EntityDomain): Promise<Object | null> {
        throw new Error("Method not implemented.");
    }
    findUnique(entity: EntityDomain): Promise<Object | null> {
        throw new Error("Method not implemented.");
    }
    inactivate(entity: EntityDomain): void {
        throw new Error("Method not implemented.");
    }
}
