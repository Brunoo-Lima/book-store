import { randomUUID } from "crypto";
import { formatString } from "../utils/formatString";
import EntityDomain from "./EntityDomain";

export class Author extends EntityDomain{
    constructor(private aut_name: string) {
        const date = new Date();
        super(randomUUID(),date.toISOString(), date.toISOString());
    }

    get nameIs() {
        return this.aut_name;
    }
    public static createAuthors(authorNames: string[]) {
        const authors = authorNames.map((authorName) => {
            const authorFormatted = formatString(authorName);
            return new Author(authorFormatted);
        });
        return authors;
    }
}
