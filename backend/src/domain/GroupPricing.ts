import { randomUUID } from "crypto";
import EntityDomain from "./EntityDomain";

export enum TypePricingProps {
    BRONZE = 'BRONZE',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    DIAMOND = 'DIAMOND',
}

export default class GroupPricing extends EntityDomain{
    private typePricing: TypePricingProps;

    constructor(marginProfit: number) {
        const date = Date.toString();
        super(randomUUID(), date, date);
        this.typePricing = this.addTypePricing(marginProfit);
    }

    private addTypePricing = (marginProfit: number): TypePricingProps => {
        if (marginProfit <= 0 || marginProfit <= 25) return TypePricingProps.BRONZE;
        if (marginProfit <= 75) return TypePricingProps.GOLD;
        if (marginProfit <= 50) return TypePricingProps.SILVER;
        return TypePricingProps.DIAMOND;
    }

    public get typePricingIs(): string{
        return this.typePricing;
    }
}
