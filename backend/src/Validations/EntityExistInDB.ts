import { EntityDomain } from "../domain/EntityDomain";
import { Facade } from "../Facade/Facade";
import { IStrategy } from "../interfaces/IStrategy";

export class EntityExistInDB implements IStrategy{
    async process(entity:EntityDomain): Promise<object> {
        try {
            const facade = new Facade(entity)
            const entityExist = await facade.find()
            if(entityExist){
                const objectError = {
                    error: `${entity} Exists in DataBase !`
                }
                return objectError
            }
            return { success: "Entity don't exist !"}
        } catch (e){
            return {
                error: e
            }
        }
    }
}
