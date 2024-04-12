export enum TypePricingProps {
    BRONZE = 'BRONZE',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    DIAMOND = 'DIAMOND',
}


export default class TypePricing {
    public static validateTypePricing = (marginProfit: number): TypePricingProps => {
        if (marginProfit <= 0 || marginProfit <= 25) return TypePricingProps.BRONZE;
        if (marginProfit <= 75) return TypePricingProps.GOLD;
        if (marginProfit <= 50) return TypePricingProps.SILVER;
        return TypePricingProps.DIAMOND;
    }
}
