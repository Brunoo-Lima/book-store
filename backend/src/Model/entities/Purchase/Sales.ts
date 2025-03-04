import { Client } from "../Client/Client";
import { Delivery } from "./Delivery";
import { EntityDomain } from "../EntityDomain";
import { Item } from "./Item";
import { Status } from "../types/Status";

export class Sales extends EntityDomain {
    constructor(
        private _dateSale: Date,
        private _client: Client,
        private _status: Status,
        private _item: Item[],
        private _delivery: Delivery

    ){
        super()
    }
    public get dateSale(): Date {
        return this._dateSale;
    }

    public set dateSale(dateSale: Date) {
        this._dateSale = dateSale;
    }

    public get client(): Client {
        return this._client;
    }

    public set client(client: Client) {
        this._client = client;
    }

    public get item(): Item[] {
        return this._item;
    }

    public set item(item: Item[]) {
        this._item = item;
    }

    public get delivery(): Delivery {
        return this._delivery;
    }

    public set delivery(delivery: Delivery) {
        this._delivery = delivery;
    }
    public get status(): Status {
        return this._status;
    }

    public set status(status: Status) {
        this._status = status;
    }
}
