export class CategoryDomain {
    constructor(private category: string) {
        this.category = category;
    }
    get name() {
        return this.category;
    }
}
