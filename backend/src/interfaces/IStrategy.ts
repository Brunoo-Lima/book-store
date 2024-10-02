import { EntityDomain } from "../Model/domain/EntityDomain";

export interface IStrategy {
    process(entity: EntityDomain): object
}
