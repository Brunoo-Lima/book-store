import BookDao from "../../DAO/BookDao";
import { CategoryDao } from "../../DAO/CategoryDao";
import UserDao from "../../DAO/UserDao";
import EntityDomain from "../EntityDomain";
import { IDao } from "../../interfaces/IDao";
import { IFacade } from "../../interfaces/IFacade";
import { IStrategy } from "../../interfaces/IStrategy";

// Context of Strategy
export default class Facade implements IFacade {
    private validationStrategies: IStrategy[];
    private daos: Map<string, IDao>;

    // Constructor that accepts a list of validation strategies
    constructor(validationStrategies: IStrategy[]) {
        this.validationStrategies = validationStrategies;
        this.daos = new Map<string, IDao>();
        this.initializeDaos();
    }

    // Initialize the map of DAOs
    private initializeDaos(): void {
        this.daos.set("BOOK", new BookDao());
        this.daos.set("USER", new UserDao());
        this.daos.set("CATEGORY", new CategoryDao());
    }

    // Apply all validation strategies to the entity
    private validateEntity(entity: EntityDomain): void {
        for (const strategy of this.validationStrategies) {
            strategy.process(entity);
        }
    }

    // Save an entity using the validation strategies and DAO strategy
    async save(entity: EntityDomain): Promise<Object | null> {
        try {
            this.validateEntity(entity);
            const dao = this.getDaoForEntity(entity);
            if (dao) {
                return await dao.create(entity);
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    async update(entity: EntityDomain): Promise<Object | null> {
        try {
            this.validateEntity(entity);
            const dao = this.getDaoForEntity(entity);
            if (dao) {
                return await dao.update(entity);
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    async inactivate(entity: EntityDomain): Promise<Object | null> {
        try {
            this.validateEntity(entity);
            const dao = this.getDaoForEntity(entity);
            if (dao) await dao.inactivate(entity);
            return null;
        } catch (error) {
            throw error;
        }
    }

    async findEntity(entity: EntityDomain): Promise<Object | null> {
        try {
            const dao = this.getDaoForEntity(entity);
            if (dao) {
                return await dao.findUnique(entity);
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    // Determine the appropriate DAO based on the entity type
    private getDaoForEntity(entity: EntityDomain): IDao | null {
        const entityType = entity.constructor.name.toUpperCase();
        return this.daos.get(entityType) || null;
    }
}
