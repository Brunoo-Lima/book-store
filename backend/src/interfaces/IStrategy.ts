import { EntityDomain } from "../domain/EntityDomain";

export interface IStrategy {
    process(entity: EntityDomain): Promise<object>
}
