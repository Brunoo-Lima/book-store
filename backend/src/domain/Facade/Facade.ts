import BookDao from "../../DAO/BookDao";
import EntityDomain from "../EntityDomain";
import { IDao } from "../interfaces/IDao";
import { IFacade } from "../interfaces/IFacade";
import { IStrategy } from "../interfaces/IStrategy";

// Context of Strategy
export default class Facade implements IFacade {
    private validationStrategy: IStrategy;
    private daoStrategy: IDao;

    // Constructor that accepts a validation strategy
    constructor(validationStrategy: IStrategy) {
        this.validationStrategy = validationStrategy;
    }

    // Set the DAO strategy at runtime
    setDaoStrategy(dao: IDao): void {
        this.daoStrategy = dao;
    }

    // Save an entity using the validation strategy and DAO strategy
    save(entity: EntityDomain): void {
        this.validationStrategy.process(entity);
        this.getDaoForEntity(entity).create(entity);
    }

    update(entity: EntityDomain): void {
        this.validationStrategy.process(entity);
        this.getDaoForEntity(entity).update(entity);
    }

    inactivate(entity: EntityDomain): void {
        this.validationStrategy.process(entity);
        this.getDaoForEntity(entity).delete(entity);
    }

    async find(entity: EntityDomain): Promise<Object | null>{
        return await this.getDaoForEntity(entity).findUnique(entity);
    }

    // Determine the appropriate DAO based on the entity type
    private getDaoForEntity(entity: EntityDomain): IDao {
        const className = entity.constructor.name.toUpperCase();
        switch (className) {
            case "BOOK":
                return new BookDao();
            default:
                throw new Error(`No DAO found for entity: ${className}`);
        }
    }
}
