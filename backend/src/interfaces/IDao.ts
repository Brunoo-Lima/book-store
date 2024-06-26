import EntityDomain from "../domain/EntityDomain";

export interface IDao{
    create(entity: EntityDomain): Promise<Object | null>;
    update(entity: EntityDomain): Promise<Object | null>;
    find(entity: EntityDomain): Promise<Object | null>;
    inactivate(entity: EntityDomain): Promise<Object | null>;
}
