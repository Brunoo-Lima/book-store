import { UUID } from "crypto";

export interface CategoryProps{
    cte_id: UUID;
    cte_type_category: string;
}
export default class Category{
    constructor(private categoryProps: CategoryProps){}
    
    public get id() : string {
        return this.categoryProps.cte_id;
    }
    
    public get typeCategory() : string {
        return this.categoryProps.cte_type_category;
    }    
}
