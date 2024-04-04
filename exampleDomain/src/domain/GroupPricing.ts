import { UUID } from "crypto"
import { TypePricing } from "../utils/groupOfPricing"

export interface GroupPricingProps{
    id: UUID;
    typePricing: TypePricing;
    rangePercent: {
        percent: Array<number>
    };
}

export default class GroupPricing{
    constructor(private groupPricingProps: GroupPricing){}
    
    public get id() : string {
        return this.groupPricingProps.id;
    }
    
    public get typePricing() : string {
        return this.groupPricingProps.typePricing;
    }
}