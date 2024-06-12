import EntityDomain from "../../domain/EntityDomain";
import { IStrategy } from "../../interfaces/IStrategy";
import { FactoryDao } from "../../DAO/FactoryDao";

export class ValidExistence implements IStrategy {
    private message: string | undefined;

    public process(entity: EntityDomain) {
        return this.entityExist(entity);
    }
    private async entityExist(entity: EntityDomain): Promise<void | string>  {
        const dao = FactoryDao.getDao(entity.constructor.name);
        const entityExist = await dao.find(entity);

        if (entityExist) {
            this.message = 'Entity already exist in database !';
            return this.message;
        }
    }
}
