import Validator, { TypePricing } from "./Validations/Validators";

export default class GroupPricing {
    private typePricing: TypePricing;
    constructor(marginProfit: number) {
        this.typePricing = Validator.validateTypePricing(marginProfit);
    }

    public get typePricingIs() : string {
        return this.typePricing
    }

}
