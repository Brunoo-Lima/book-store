import { Client } from "./Client";
import { EntityDomain } from "./EntityDomain";

export class Delivery extends EntityDomain{
    constructor(
        private _client: Client,
        private _date: Date

    ){
        super()
    }
    public get_client(): Client {
        return this._client;
    }

    public set_client(_client: Client): void {
        this._client = _client;
    }

    public get_date(): Date {
        return this._date;
    }

    public set_date(_date: Date): void {
        this._date = _date;
    }
}
