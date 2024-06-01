import EntityDomain from "./EntityDomain";

export class Author extends EntityDomain{
    constructor(private name: string) {
        const date = new Date();
        super(date.toString(), date.toString());
    }

    get nameIs() {
        return this.name;
    }
}
