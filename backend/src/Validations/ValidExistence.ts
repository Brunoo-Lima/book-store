import { EOF } from "dns";
import BookDao from "../DAO/BookDao";
import { CategoryDao } from "../DAO/CategoryDao";
import UserDao from "../DAO/UserDao";
import EntityDomain from "../domain/EntityDomain";
import { ErrorValidationsException } from "../domain/Errors/ErrorValidationsException";
import { IDao } from "../interfaces/IDao";
import { IStrategy } from "../interfaces/IStrategy";
import { FactoryDao } from "../DAO/FactoryDao";

export class ValidExistence implements IStrategy {
    private dao: IDao | null = null;
    async process(entity: EntityDomain) {
        try{
            this.dao = FactoryDao.createDao(entity.constructor.name);

            const entityExist = await this.dao.findUnique(entity);

            if(entityExist) throw new ErrorValidationsException('Entity already exist !');

        } catch(e) {
            return e;
        }
    }
}
