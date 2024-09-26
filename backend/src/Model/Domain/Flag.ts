import { EntityDomain } from "./EntityDomain";
import { Flags } from "./types/Flags";

export class Flag extends EntityDomain{
    constructor(
        private name: Flags
    ){
        super()
    }
}
