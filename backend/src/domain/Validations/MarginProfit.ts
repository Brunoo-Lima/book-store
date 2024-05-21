export default class MarginProfitValidator{
    public static calculateMarginProfit(priceProduct: number,costProduct: number): number {
        if(costProduct === 0 || priceProduct === 0) return 0;
        return ((priceProduct - costProduct) / priceProduct) * 100;
    }
}
