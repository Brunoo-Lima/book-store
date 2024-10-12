import { EntityDomain } from "./EntityDomain";
import { StatusDelivery } from "./types/StatusDelivery";

export class Delivery extends EntityDomain{
    constructor(
        private _dateInitial: Date,
        private _status: StatusDelivery,
        private _dateFinal: Date

    ){
        super()
    }
    public get dateInitial(): Date {
        return this._dateInitial;
    }

    public set dateInitial(dateInitial: Date) {
        this._dateInitial = dateInitial;
    }

    public get status(): StatusDelivery {
        return this._status;
    }

    public set status(status: StatusDelivery) {
        this._status = status;
    }

    public get dateFinal(): Date {
        return this._dateFinal;
    }

    public set dateFinal(dateFinal: Date) {
        this._dateFinal = dateFinal;
    }

}
