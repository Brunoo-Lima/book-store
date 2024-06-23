import EntityDomain from "../../domain/EntityDomain";
import { IStrategy } from "../../interfaces/IStrategy";

export default class GenerateLog implements IStrategy {
    process(entity: EntityDomain): unknown {
        throw new Error("Method not implemented.");
    }
}

