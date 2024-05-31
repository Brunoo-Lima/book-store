import { randomUUID } from "crypto";
import EntityDomain from "./EntityDomain";

export class Category extends EntityDomain {
    constructor(private category: string) {
        const date = new Date();
        super(randomUUID(),date.toString(), date.toString());
    }
    get name() {
        return this.category;
    }
}
