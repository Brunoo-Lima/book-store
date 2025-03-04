import { EntityDomain } from "../Model/entities/EntityDomain";

export interface IStrategy {
    process(entity: EntityDomain): object
}
