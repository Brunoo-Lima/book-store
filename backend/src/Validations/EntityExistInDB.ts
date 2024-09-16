import { EntityDomain } from "../domain/EntityDomain";
import { Facade } from "../Facade/Facade";
import { IStrategy } from "../interfaces/IStrategy";

export class EntityExistInDB implements IStrategy{
    async process(entity:EntityDomain): Promise<object> {
        const facade = new Facade(entity)
        try {
            const entityExist = await facade.find(entity)
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
