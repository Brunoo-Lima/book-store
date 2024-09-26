import { Client } from "./Client";
import { EntityDomain } from "./EntityDomain";

export class LogChange extends EntityDomain{
    constructor(
        private _user: Client
    ){
        super()
    }
    public get_user(): Client {
        return this._user;
    }

    public set_user(_user: Client): void {
        this._user = _user;
    }
}
