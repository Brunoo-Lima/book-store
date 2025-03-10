import { EntityDomain } from "../entities/EntityDomain";
import { Facade } from "../../Controllers/Facade/Facade";
import { IStrategy } from "../../interfaces/IStrategy";

export class EntityExistInDB implements IStrategy{
    async process(entity:EntityDomain): Promise<object> {
        try {
            const facade = new Facade()
            const entityExist = await facade.find(entity)
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
