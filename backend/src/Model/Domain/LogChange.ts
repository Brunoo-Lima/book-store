import { EntityDomain } from "./EntityDomain";
import { User } from "./User";

export class LogChange extends EntityDomain{
    constructor(
        private _user: User,
        private _action: string
    ){
        super()
    }
    public get_user(): User {
        return this._user;
    }

    public set_user(_user: User): void {
        this._user = _user;
    }
    public get_action(): string {
        return this._action;
    }

    public set_action(_action: string) {
        this._action = _action;
    }
}
