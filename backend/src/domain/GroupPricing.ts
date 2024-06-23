import { randomUUID } from "crypto";
import EntityDomain from "./EntityDomain";

export class GroupPricing extends EntityDomain{
    constructor(private type: string, private percent: number){
        const date = new Date();
        super(randomUUID(), date.toISOString(), date.toISOString());
    }
    public getTypePricing(): string{
        return this.type;
    }
    public getPercentPrice(): number {
        return this.percent;
    }
}
