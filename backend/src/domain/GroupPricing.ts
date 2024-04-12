import TypePricing, { TypePricingProps } from "./Validations/TypePricing";

export default class GroupPricing {
    private typePricing: TypePricingProps;
    constructor(marginProfit: number) {
        this.typePricing = TypePricing.validateTypePricing(marginProfit);
    }

    public get typePricingIs() : string {
        return this.typePricing
    }

}
