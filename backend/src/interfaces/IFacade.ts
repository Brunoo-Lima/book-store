import { EntityDomain } from "../domain/EntityDomain";

export interface IFacade {
    create(entity: EntityDomain): Promise<void>
    update(entity: EntityDomain): Promise<void>
    delete(entity: EntityDomain): Promise<void>
    find(entity: EntityDomain): Promise<void>
}
