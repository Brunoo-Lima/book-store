
export enum TypePricing {
    BRONZE = 'BRONZE',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    DIAMOND = 'DIAMOND',
}


export default class GroupPricing {
    private typePricing: TypePricing;
    constructor(marginProfit: number) {
        this.typePricing = this.validateGroupPricing(marginProfit);
    }
    //Logic is incorrect
    private validateGroupPricing(marginProfit: number): TypePricing {
        if (marginProfit <= 0 || marginProfit <= 25) return TypePricing.BRONZE;
        if (marginProfit <= 50) return TypePricing.SILVER;
        if (marginProfit <= 75) return TypePricing.GOLD;
        return TypePricing.DIAMOND;
    }

    public get typeGroupPricing(): string {
        return this.typePricing;
    }
}
