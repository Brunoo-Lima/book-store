import { randomUUID } from "crypto";
import Book from "./Book";
import EntityDomain from "./EntityDomain";
import { User } from "./User";


//Não é entidade de dominio é Regra de negócio, vai para o "Business"U
export type Logs = {
    entity: EntityDomain,
    user: User,
    description: string
}

export class LogChange extends EntityDomain {
    private logs: Logs;

    constructor(entity: EntityDomain, user: User) {
        const date = new Date();
        super(randomUUID(), date.toString(), date.toString());
        this.logs = {
            entity: entity,
            description: this.addDescription(entity),
            user: user,
        }

    }
    private addDescription(entity: EntityDomain): string {
        const dateCreate = new Date(entity.dateCreate);
        const dateUpdate = new Date(entity.dateUpdate);

        return (dateCreate.getTime() <= dateUpdate.getTime()) ? "CREATE" : "UPDATE";
    }
    public getLogs(): Logs {
        return this.logs;
    }
}

