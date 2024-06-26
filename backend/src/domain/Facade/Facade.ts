import EntityDomain from "../EntityDomain";
import { IDao } from "../../interfaces/IDao";
import { IFacade } from "../../interfaces/IFacade";
import { IStrategy } from "../../interfaces/IStrategy";
import { FactoryDao } from "../../DAO/FactoryDao";
import ISBN from "../../Business/implementation/ValidISBN";
import Book from "../Book";
import { ValidRequiredBookData } from "../../Business/implementation/ValidRequiredBookData";
import { ValidBookDataDefaults } from "../../Business/implementation/ValidBookDataDefaults";
import { ValidGrpPricing } from "../../Business/implementation/ValidGrpPricing";

export type Message = { //Transformar os erros em um ENUM
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
                const hasError = await strategy.process(entity) as string | void;
                if (hasError !== undefined) {
                    this.message.push({
                        error: hasError,
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
            const entityExist = await this.findEntity([entity]);

            if (entityExist) {
                this.message.push({
                    error: "Entity already exist in database !",
                })
                return this.message;
            }
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

    async update(entities: EntityDomain[]): Promise<Message[]> {
        for (const entity of entities) {
            const hasErrorInStrategy = await this.callStrategy(entity);
            if (hasErrorInStrategy !== null) return hasErrorInStrategy;

            const dao = this.fillDao(entity);
            const updatedEntity = await dao.update(entity);

            if (!updatedEntity) {
                this.message.push({ error: 'Entity cannot be updated !' });
                return this.message;
            }
            this.message.push({ success: 'Entity updated !' });
        }
        return this.message;
    }

    async inactivate(entity: EntityDomain): Promise<Object | null> {
        const dao = this.fillDao(entity);
        const inactivatedEntity = await dao.inactivate(entity);

        return inactivatedEntity;
    }

    async findEntity(entities: EntityDomain[]): Promise<Object | null> {
        const foundEntities: Object[] = [];

        for (const entity of entities) {
            const dao = this.fillDao(entity);
            const foundEntity = await dao.find(entity);
            if (foundEntity) foundEntities.push(foundEntity);

        }

        return foundEntities.length > 0 ? foundEntities : null;
    }

    async findManyEntity(entity: EntityDomain){
        const dao = this.fillDao(entity);
        const entitiesExist = await dao.find(entity);
        if (entitiesExist) return entitiesExist;
        return null;
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
            new ValidRequiredBookData(),
            new ValidBookDataDefaults(),
            new ValidGrpPricing(),
        ]);
    }
}
