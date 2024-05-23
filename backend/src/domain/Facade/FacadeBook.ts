import Book from "../Book";
import EntityDomain from "../EntityDomain";
import { IStrategy } from "../interfaces/IStrategy";
import Facade from "./Facade";

export default class FacadeBook extends Facade {
    constructor(strategy: IStrategy){
        super(strategy);
    }
    save(entity: EntityDomain): void {
        
    }
}
