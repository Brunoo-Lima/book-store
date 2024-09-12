import { Classification } from "./Classification";
import { EntityDomain } from "./EntityDomain";

export class Ranking extends EntityDomain{
    constructor(
        private _classifications: Classification[]
    ){
        super()
    }
}
