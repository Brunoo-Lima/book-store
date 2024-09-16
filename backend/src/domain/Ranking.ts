import { EntityDomain } from './EntityDomain';
import { Client } from './Client';

export class Ranking extends EntityDomain {
    private _client: Client[];

    constructor(client: Client) {
        super();

        this._client = new Array<Client>
        this._client.push(client)
    }
    get client(): Client[] {
        return this._client;
    }

    public set client(client: Client) {
        this._client.push(client)
        this._client.sort()
    }
}
