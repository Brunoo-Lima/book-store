import EntityDomain from "../domain/EntityDomain";
import { IStrategy } from "../interfaces/IStrategy";

export class ValidGrpPricing implements IStrategy{
    process(entity: EntityDomain): void {
        throw new Error("Method not implemented.");
    }

}
