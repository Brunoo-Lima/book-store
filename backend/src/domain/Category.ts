export default class Category {
    constructor(private categoryProps: string[]){}

    public get category() {
        return this.categoryProps;
    }

}
