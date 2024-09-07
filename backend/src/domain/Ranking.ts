import { EntityDomain } from "./EntityDomain";

export class Ranking extends EntityDomain{
    constructor(
        private _history: History[]
    ){
        super()
    }
}
