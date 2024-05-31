import { randomUUID } from "crypto";
import EntityDomain from "./EntityDomain";

export default class User extends EntityDomain{
    constructor(private userName: string){
        const date = new Date();
        super(randomUUID(),date.toString(), date.toString());
    }

    public get name() : string {
        return this.userName;
    }

}
