import { randomUUID } from "crypto";
import EntityDomain from "./EntityDomain";

export class Category extends EntityDomain {
    constructor(private category: string) {
        const date = Date.toString();
        super(randomUUID(), date, date);
    }
    get name() {
        return this.category;
    }
}
