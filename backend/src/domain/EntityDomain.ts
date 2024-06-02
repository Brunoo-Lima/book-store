

// Entity Generic, created to use in DAO
export default class EntityDomain{
    private id: string | null = null;
    constructor(private created_at: string, private updated_at: string){}

    public get idEntity() : string | null{
        return this.id;
    }
    public set idEntity(id: string){
        this.id = id;
    }
    public get dateCreate(): string{
        return this.created_at;
    }

    public get dateUpdate() : string{
        return this.updated_at;
    }
    public set updateAt(updated_at: string){
        this.updated_at = updated_at;
    }
}
