import EntityDomain from "../EntityDomain";
import { IDao } from "../../interfaces/IDao";
import { IFacade } from "../../interfaces/IFacade";
import { IStrategy } from "../../interfaces/IStrategy";
import { FactoryDao } from "../../DAO/FactoryDao";
import ISBN from "../../Validations/ISBN";
import { ValidExistence } from "../../Validations/ValidExistence";
import { ValidGrpPricing } from "../../Validations/ValidGrpPricing";
import Book from "../Book";
import { Category } from "../Category";
import { Author } from "../Author";
import { GroupPricing } from "../GroupPricing";
import User from "../User";

// Context of Strategy
export default class Facade implements IFacade {
    private strategies: Map<String, Array<IStrategy>>
    private daos:Map<String, IDao>;

    // Constructor that accepts a list of validation strategies
    constructor() {
        this.strategies = new Map<String, Array<IStrategy>>;
        this.daos = new Map<String, IDao>
        this.setAllStrategies();
    }

    // Apply all validation strategies to the entity
    private callStrategy(entity: EntityDomain): void {
        const { name } = entity.constructor;
        const strategy = this.strategies.get(name.toUpperCase());
        if(strategy){
            for(const str of strategy){
                str.process(entity);
            }
        }
    }

    // Save an entity using the validation strategies and DAO strategy
    async save(entity: EntityDomain): Promise<Object | null> {
        this.callStrategy(entity);
        const dao = this.fillDao(entity);
        if (dao) {
            return await dao.create(entity);
        }
        throw new Error('Was not create the data in database !');
    }

    async update(entity: EntityDomain): Promise<Object | null> {
        this.callStrategy(entity);
        const dao = this.fillDao(entity);
        if (dao) {
            return await dao.update(entity);
        }
        throw new Error('Was not possible update the data !');
    }

    async inactivate(entity: EntityDomain): Promise<Object | null> {
        this.callStrategy(entity);
        const dao = this.fillDao(entity);
        if (dao){
            return await dao.inactivate(entity);
        }
        throw new Error('Was not possible inactivate the data !');
    }

    async findEntity(entity: EntityDomain): Promise<Object | null> {
        const dao = this.fillDao(entity);
        if (dao) {
            return await dao.findUnique(entity);
        }
        throw new Error('Was not possible find the data !');
    }

    // Determine the appropriate DAO based on the entity type
    private fillDao(entity: EntityDomain): IDao {
        const entityName = entity.constructor.name.toUpperCase();
        const daoExist = this.daos.get(entityName);
        if(daoExist) return daoExist;

        const dao = FactoryDao.createDao(entityName);
        this.daos.set(entityName, dao);
        return dao;
    }

    //Set all Strategies of each entity
    private setAllStrategies(){
        const validExistence = new ValidExistence();
        this.strategies.set(Book.name.toUpperCase(), [
            new ISBN(),
            validExistence
        ])
        this.strategies.set(Category.name.toUpperCase(), [
            validExistence
        ])
        this.strategies.set(Author.name.toUpperCase(), [
            validExistence,
        ])
        this.strategies.set(GroupPricing.name.toUpperCase(), [
            validExistence,
            new ValidGrpPricing(),
        ])
        this.strategies.set(User.name.toUpperCase(), [
            validExistence,
        ]);
    }
}
