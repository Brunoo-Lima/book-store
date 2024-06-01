import EntityDomain from "./EntityDomain";

export class Category extends EntityDomain {
    constructor(private category: string) {
        const date = new Date();
        super(date.toString(), date.toString());
    }
    get name() {
        return this.category;
    }
}
