import { EntityDomain } from "../domain/EntityDomain";

export interface IFacade {
    create(entity: EntityDomain): Promise<unknown>
    update(entity: EntityDomain): Promise<unknown>
    delete(entity: EntityDomain): Promise<unknown>
    find(entity: EntityDomain): Promise<unknown>
}
