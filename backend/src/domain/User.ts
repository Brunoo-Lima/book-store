import { randomUUID } from "crypto";
import EntityDomain from "./EntityDomain";

export default class User extends EntityDomain{
    constructor(private userName: string){
        const date = Date.toString();
        super(randomUUID(), date, date);
    }

    public get name() : string {
        return this.userName;
    }

}
