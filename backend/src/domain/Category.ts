import { randomUUID } from "crypto";
import { formatString } from "../utils/formatString";
import EntityDomain from "./EntityDomain";

export class Category extends EntityDomain {
    constructor(private cte_name: string) {
        const date = new Date();
        super(randomUUID() ,date.toISOString(), date.toISOString());
    }
    get name() {
        return this.cte_name;
    }

    public static createCategories(categoriesNames: string[]): Category[] {
        const categories = categoriesNames.map((categoryName) => {
            const categoryFormatted = formatString(categoryName);
            return new Category(categoryFormatted);
        });
        return categories;
    }
}
