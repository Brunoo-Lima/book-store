import { EntityDomain } from "../domain/EntityDomain";
import { Facade } from "../../Controllers/Facade/Facade";
import { IStrategy } from "../../interfaces/IStrategy";

export class EntityExistInDB implements IStrategy{
    async process(entity:EntityDomain): Promise<object> {
        try {
            const facade = new Facade(entity)
            const entityExist = await facade.find()
            console.log(entityExist)
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
