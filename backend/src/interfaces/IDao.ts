import { EntityDomain } from "../Model/entities/EntityDomain";

export interface IDao {
    create(entity: EntityDomain): Promise<unknown>
    update(entity: EntityDomain): Promise<unknown>
    delete(entity: EntityDomain): Promise<unknown>
    find(entity: EntityDomain):  Promise<unknown>
    findMany(entity: EntityDomain): Promise<unknown>
}
