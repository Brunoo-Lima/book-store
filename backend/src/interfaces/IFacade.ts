import EntityDomain from "../domain/EntityDomain";

export interface IFacade{
    save(entity: EntityDomain[] | EntityDomain[]): void;
    update(entity: EntityDomain): void;
    inactivate(entity: EntityDomain): void;
    findEntity(entity: EntityDomain[]): Object;
}
