import EntityDomain from "../domain/EntityDomain";
import { IDao } from "../interfaces/IDao";

export class CategoryDao implements IDao {
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
