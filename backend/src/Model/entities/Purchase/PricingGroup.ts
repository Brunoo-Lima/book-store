import { EntityDomain } from "../EntityDomain";

export enum TypePricing {
    "DIAMOND" = "DIAMOND",
    "GOLD" = "GOLD",
    "SILVER" = "SILVER",
    "BRONZE" = "BRONZE"
}

export interface PricingGroupProps {
    type: TypePricing,
}

export class PricingGroup extends EntityDomain{
    private group_profit: number = 0

    constructor(private pricingProps: PricingGroupProps){
        super()
    }

    public set type(type : TypePricing) {
        this.pricingProps.type = type;
    }

    public get type() : TypePricing {
        return this.pricingProps.type
    }

    public get profit() : number {
        return this.group_profit
    }

    public set profit(value: number){
        this.group_profit = value
    }
}
