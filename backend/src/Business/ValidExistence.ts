import EntityDomain from "../domain/EntityDomain";
import { IStrategy } from "../interfaces/IStrategy";
import { FactoryDao } from "../DAO/FactoryDao";

export class ValidExistence implements IStrategy {

    async process(entity: EntityDomain) {
        const dao = FactoryDao.createDao(entity.constructor.name);

        const entityExist = await dao.find(entity);
        if (!entityExist) return;
        return 'Entity already exist in database !';
    }
}
