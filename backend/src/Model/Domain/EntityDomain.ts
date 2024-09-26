import { randomUUID, UUID } from "crypto";

export abstract class EntityDomain{
    private _id: UUID;
    private created_at: string;
    private updated_at: string;

    constructor() {
        this._id = randomUUID()
        this.created_at = new Date().toString();
        this.updated_at = new Date().toString();
    }

    public get createdAt() : string {
        return this.created_at
    }

    public get updatedAt() : string {
        return this.updated_at
    }

    public get id() : string {
        return this._id
    }
}
