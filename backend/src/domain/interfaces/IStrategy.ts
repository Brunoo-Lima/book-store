import EntityDomain from "../EntityDomain";

export interface IStrategy {
    process(entity: EntityDomain):void;
}
