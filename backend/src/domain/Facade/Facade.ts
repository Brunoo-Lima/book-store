import EntityDomain from "../EntityDomain";
import { IDao } from "../../interfaces/IDao";
import { IFacade } from "../../interfaces/IFacade";
import { IStrategy } from "../../interfaces/IStrategy";
import { FactoryDao } from "../../DAO/FactoryDao";
import ISBN from "../../Business/ValidISBN";
import { ValidGrpPricing } from "../../Business/ValidGrpPricing";
import Book from "../Book";
import { GroupPricing } from "../GroupPricing";
import { ValidExistence } from "../../Business/ValidExistence";

export default class Facade implements IFacade {
    private strategies: Map<String, Array<IStrategy>>;
    private daos: Map<String, IDao>;

    constructor() {
        this.strategies = new Map<String, Array<IStrategy>>();
        this.daos = new Map<String, IDao>();
        this.setAllStrategies();
    }

    private callStrategy(entity: EntityDomain): void {
        const { name } = entity.constructor;
        const strategies = this.strategies.get(name.toUpperCase());
        if (strategies) {
            for (const strategy of strategies) {
                strategy.process(entity);
            }
        }
    }

    async save(entity: EntityDomain): Promise<Object | null> {
        this.callStrategy(entity);
        const dao = this.fillDao(entity);
        const entityExistInDB = await this.entityExist(entity);

        if (entityExistInDB !== null) return entityExistInDB;

        const savedEntity = await dao.create(entity);
        return savedEntity;
    }

    async update(entity: EntityDomain): Promise<Object | null> {
        this.callStrategy(entity);
        const dao = this.fillDao(entity);
        const updatedEntity = await dao.update(entity);

        return updatedEntity;
    }

    async inactivate(entity: EntityDomain): Promise<Object | null> {
        this.callStrategy(entity);
        const dao = this.fillDao(entity);
        const inactivatedEntity = await dao.inactivate(entity);

        return inactivatedEntity;
    }

    async findEntity(entity: EntityDomain): Promise<Object | null> {
        const dao = this.fillDao(entity);
        const foundEntity = await dao.find(entity);

        return foundEntity;
    }

    private fillDao(entity: EntityDomain): IDao {
        const { name } = entity.constructor;
        const daoExist = this.daos.get(name.toUpperCase().trim());
        if (daoExist) return daoExist;
        const dao = FactoryDao.createDao(name.toUpperCase().trim());

        this.daos.set(name.toUpperCase(), dao);

        return dao;
    }

    private setAllStrategies() {
        this.strategies.set(Book.name.toUpperCase(), [
            new ISBN(),
            new ValidExistence()
        ]);
        this.strategies.set(GroupPricing.name.toUpperCase(), [
            new ValidGrpPricing(),
        ]);
    }

    private async entityExist(entity: EntityDomain) {
        const dao = this.fillDao(entity);
        const existingEntity = await dao.find(entity);

        return existingEntity;
    }
}
