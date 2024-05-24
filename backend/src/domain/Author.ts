import { randomUUID } from "crypto";
import EntityDomain from "./EntityDomain";

export class Author extends EntityDomain{
    constructor(private name: string) {
        const date = Date.toString();
        super(randomUUID(),date, date);
    }

    get nameIs() {
        return this.name;
    }
}
