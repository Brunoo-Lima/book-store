import { randomUUID } from "crypto";
import EntityDomain from "./EntityDomain";

export class GroupPricing extends EntityDomain{
    constructor(private type: string, private percent: number){
        const date = new Date();
        super(randomUUID(), date.toString(), date.toString());
    }
    public getTypePricing(): string{
        return this.type;
    }
    public getPercentPrice(): number {
        return this.percent;
    }
}
