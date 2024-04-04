import { UUID } from "crypto";

export interface AuthorProps {
    aut_id: UUID,
    aut_name: string,
}
export default class Author {
    constructor(private authorProps: AuthorProps){}
    
    public get id() : string {
        return this.authorProps.aut_id;
    }
    
    
    public get name() : string {
        return this.authorProps.aut_name;
    }
    
}