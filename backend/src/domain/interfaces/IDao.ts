import EntityDomain from "../EntityDomain";

export interface IDao{
    create(entity: EntityDomain): void;
    update(entity: EntityDomain): void;
    findUnique(entity: EntityDomain): Promise<Object | null>;
    delete(entity: EntityDomain): void;
}
