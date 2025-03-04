import { EntityDomain } from "../../EntityDomain";

export interface CategoriesProps {
    name: string
}

export class Category extends EntityDomain {
    constructor(private categoriesProps: CategoriesProps){
        super()
    }

    public set name(name : string) {
        this.categoriesProps.name= name;
    }

    public get name() : string {
        return this.categoriesProps.name
    }


}
