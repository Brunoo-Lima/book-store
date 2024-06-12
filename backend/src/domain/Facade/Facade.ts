import EntityDomain from "../EntityDomain";
import { IDao } from "../../interfaces/IDao";
import { IFacade } from "../../interfaces/IFacade";
import { IStrategy } from "../../interfaces/IStrategy";
import { FactoryDao } from "../../DAO/FactoryDao";
import ISBN from "../../Business/implementation/ValidISBN";
import { ValidGrpPricing } from "../../Business/implementation/ValidGrpPricing";
import Book from "../Book";
import { GroupPricing } from "../GroupPricing";
import { ValidExistence } from "../../Business/implementation/ValidExistence";
import { ValidRequiredBookData } from "../../Business/implementation/ValidRequiredBookData";
import { ValidBookDataDefaults } from "../../Business/implementation/ValidBookDataDefaults";

export type Message = {
    error?: string,
    success?: string,
}

export default class Facade implements IFacade {
    private strategies: Map<String, Array<IStrategy>>;
    private daos: Map<String, IDao>;
    private message: Message[];

    constructor() {
        this.strategies = new Map<String, Array<IStrategy>>();
        this.daos = new Map<String, IDao>();
        this.setAllStrategies();
        this.message = new Array<Message>
    }

    public async callStrategy(entity: EntityDomain): Promise<Message[] | null> {
        const { name } = entity.constructor;
        const strategies = this.strategies.get(name.toUpperCase());

        if (strategies) {
            for (const strategy of strategies) {
                const hasError = await strategy.process(entity) as string;
                if (hasError !== null) {
                    this.message.push({
                        error: `Entity ${name} is invalid !`
                    });
                    return this.message;
                }
            }
        }
        return null;
    }

    async save(entities: EntityDomain[]): Promise<Message[]> {
        for (const entity of entities) {
            const hasErrorInStrategy = await this.callStrategy(entity);
            if (hasErrorInStrategy !== null) return hasErrorInStrategy;

            const dao = this.fillDao(entity);
            const savedEntity = await dao.create(entity);

            if (!savedEntity) {
                this.message.push({ error: 'Entity cannot be created in database !' });
                return this.message;
            }
        }

        this.message.push({
            success: 'Entity created in database !'
        });
        return this.message;
    }

    async update(entity: EntityDomain): Promise<Object | null> {
        const dao = this.fillDao(entity);

        const updatedEntity = await dao.update(entity);

        return updatedEntity;
    }

    async inactivate(entity: EntityDomain): Promise<Object | null> {
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
        const dao = FactoryDao.getDao(name.toUpperCase().trim());

        this.daos.set(name.toUpperCase(), dao);

        return dao;
    }

    private setAllStrategies() {
        this.strategies.set(Book.name.toUpperCase(), [
            new ISBN(),
            new ValidExistence(),
            new ValidRequiredBookData(),
            new ValidBookDataDefaults()
        ]);
        this.strategies.set(GroupPricing.name.toUpperCase(), [
            new ValidExistence(),
        ]);
    }

    private async entityExist(entity: EntityDomain) {
        return await this.findEntity(entity);
    }
}
