import { randomUUID } from "crypto";
import EntityDomain from "./EntityDomain";

export class User extends EntityDomain{
    constructor(private userName: string){
        const date = new Date();
        super(randomUUID(), date.toISOString(), date.toISOString());
    }

    public get name() : string {
        return this.userName;
    }

}
