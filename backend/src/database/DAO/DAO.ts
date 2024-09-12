import { EntityDomain } from "../../domain/EntityDomain";
import { IDao } from "./IDao";

export abstract class DAO implements IDao {
    public abstract create(entity: EntityDomain): Promise<void>
    public abstract update(entity: EntityDomain): Promise<void>
    public abstract delete(entity: EntityDomain): Promise<void>
    public abstract  find(entity: EntityDomain): Promise<void>
}
