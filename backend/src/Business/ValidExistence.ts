import EntityDomain from "../domain/EntityDomain";
import { IStrategy } from "../interfaces/IStrategy";
import { FactoryDao } from "../DAO/FactoryDao";

export class ValidExistence implements IStrategy {

    async process(entity: EntityDomain): Promise<void | Object> {
        const dao = FactoryDao.getDao(entity.constructor.name);
        const entityExist = await dao.find(entity);
        
        if (entityExist) {
            return {
                error: 'Entity already exist in database !'
            };
        }
    }
}
