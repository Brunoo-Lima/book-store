import { EntityDomain } from "../../EntityDomain";

export interface AuthorProps{
    name: string
}

export class Author extends EntityDomain{
    constructor(private authorProps: AuthorProps){
        super()
    }

    public set name(name : string) {
        this.authorProps.name = name;
    }

    public get name() : string {
        return this.authorProps.name
    }
}
