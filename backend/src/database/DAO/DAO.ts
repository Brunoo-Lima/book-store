import { EntityDomain } from "../../domain/EntityDomain";
import { IDao } from "./IDao";

export abstract class DAO implements IDao {
    public abstract create(entity: EntityDomain): Promise<unknown>
    public abstract update(entity: EntityDomain): Promise<unknown>
    public abstract delete(entity: EntityDomain): Promise<unknown>
    public abstract  find(entity: EntityDomain): Promise<unknown>
}
