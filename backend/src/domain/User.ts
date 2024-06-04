import EntityDomain from "./EntityDomain";

export class User extends EntityDomain{
    constructor(private userName: string){
        const date = new Date();
        super(date.toString(), date.toString());
    }

    public get name() : string {
        return this.userName;
    }

}
