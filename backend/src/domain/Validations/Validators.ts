export enum TypePricing {
    BRONZE = 'BRONZE',
    SILVER = 'SILVER',
    GOLD = 'GOLD',
    DIAMOND = 'DIAMOND',
}


export default class Validator {
    public static validateTypePricing = (marginProfit: number): TypePricing => {
        if (marginProfit <= 0 || marginProfit <= 25) return TypePricing.BRONZE;
        if (marginProfit <= 75) return TypePricing.GOLD;
        if (marginProfit <= 50) return TypePricing.SILVER;
        return TypePricing.DIAMOND;
    }
    public static validISBN(): boolean {
        return true;
    }
}
