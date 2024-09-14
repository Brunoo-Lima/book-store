import { EntityDomain } from './EntityDomain';
import { Client } from './Client';

export class Ranking extends EntityDomain {
    private _value: number;
    private _client: Client;

    constructor(value: number, client: Client) {
        super();
        this._value = value;
        this._client = client;
    }
    get client(): Client {
        return this._client;
    }

    public set client(client: Client) {
        this._client = client
    }
    get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = value
    }
}
