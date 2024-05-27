import { EOF } from "dns";
import BookDao from "../DAO/BookDao";
import { CategoryDao } from "../DAO/CategoryDao";
import UserDao from "../DAO/UserDao";
import EntityDomain from "../domain/EntityDomain";
import { ErrorValidationsException } from "../domain/Errors/ErrorValidationsException";
import { IDao } from "../interfaces/IDao";
import { IStrategy } from "../interfaces/IStrategy";

export class ValidExistence implements IStrategy {
    private dao: IDao | null = null;
    async process(entity: EntityDomain) {
        try{
            this.dao = this.fillDao(entity.constructor.name);
            if(!this.dao) throw new ErrorValidationsException('Dao cannot be null !');

            const entityExist = await this.dao.findUnique(entity);
            
            if(entityExist) throw new ErrorValidationsException('Entity already exist !');

        } catch(e) {
            return e;
        }
    }
    private fillDao (entityName: string): IDao | null{
        switch(entityName.toUpperCase()){
            case "BOOK":
                return new BookDao();
            case "USER":
                return new UserDao();
            case "CATEGORY":
                return new CategoryDao();
            default:
                return null;
        }
    }
}
