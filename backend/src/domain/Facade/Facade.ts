import EntityDomain from "../EntityDomain";
import { IFacade } from "../interfaces/IFacade";
import { IDao } from "../interfaces/IDao";
import UserDao from "../../DAO/UserDao";
import BookDao from "../../DAO/BookDao";
import EntityErrorException from "../Errors/EntityErrorException";


export default class Facade implements IFacade {
    private dao: IDao;  // dao must implement the methods

    constructor(entity: EntityDomain) {
        this.dao = this.fillDao(entity);
    }

    async save(entity: EntityDomain) {
        const entityExists = await this.dao.findUnique(entity);
        if(entityExists) throw new EntityErrorException(`Data exists in database !`);
        this.dao.create(entity);
    }

    async update(entity: EntityDomain) {
        entity.updateAt = Date.toString();
        await this.dao.update(entity);
    }

    inactivate(entity: EntityDomain): void {
        throw new Error("Method not implemented.");
    }
    async findEntity(entity: EntityDomain) {
        const data = await this.dao.findUnique(entity);
        return data;
    }


    public fillDao(entity: EntityDomain): IDao{
        const className = entity.constructor.name

        switch(className.toUpperCase()){
            case 'USER':
                return new UserDao();
            case 'BOOK':
                return new BookDao();
            default:
                return new BookDao();
        }
    }
}

