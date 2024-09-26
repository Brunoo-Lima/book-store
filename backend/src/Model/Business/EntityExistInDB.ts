import { EntityDomain } from "../../Model/domain/EntityDomain";
import { Facade } from "../../Facade/Facade";
import { IStrategy } from "../../interfaces/IStrategy";

export class EntityExistInDB implements IStrategy{
    async process(entity:EntityDomain): Promise<object> {
        try {
            const facade = new Facade(entity)
            const entityExist = await facade.find()
            if(entityExist){
                return  {
                    error: `${entity.constructor.name} Exists in DataBase !`
                }
            }
            return { success: "Entity was created !"}
        } catch (e){
            return {
                error: e
            }
        }
    }
}
