import { Client } from "./Client";
import { EntityDomain } from "./EntityDomain";
import { Item } from "./Item";

export class Sales extends EntityDomain {
    constructor(
        private _dateSale: Date,
        private _client: Client,
        private _item: Item[]

    ){
        super()
    }
    public get_dateSale(): Date {
        return this._dateSale;
    }

    public set_dateSale(_dateSale: Date): void {
        this._dateSale = _dateSale;
    }

    public get_client(): Client {
        return this._client;
    }

    public set_client(_client: Client): void {
        this._client = _client;
    }

    public get_item(): Item[] {
        return this._item;
    }

    public set_item(_item: Item[]): void {
        this._item = _item;
    }
}
