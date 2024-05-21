import EntityDomain from "../EntityDomain";

export interface IFacade{
    save(entity: EntityDomain): void;
    update(entity: EntityDomain): void;
    inactivate(entity: EntityDomain): void;
    findEntity(entity: EntityDomain): Object;
}
