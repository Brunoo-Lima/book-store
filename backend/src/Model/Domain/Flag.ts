import { EntityDomain } from "./EntityDomain";
import { Flags } from "./types/Flags";

export class Flag extends EntityDomain{
    constructor(
        private name: Flags

    ){
        super()
    }
    public get flag(): Flags {
        return this.name;
    }

    public set flag(name: Flags) {
        this.name = name;
    }
}
