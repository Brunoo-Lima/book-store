import GroupPricing from "./GroupPricing";
import categoriesChange, { Status } from "../utils/categoriesChange";

export interface ProductProps{
    code: string;
    status?: Status;
    justifyStatus?: string;
    categoryOfChange?: string;
    codeBar: string;
    priceAcquisition: number;
    costProduct: number;    //Include expense
    quantity: number;
    groupPricing?: GroupPricing;
    marginProfit?: number
    created_at: number;
    updated_at: number;
}

export default abstract class Product {

    constructor(private productProps: ProductProps){
        this.productProps.marginProfit =this.calculateMarginProfit();
        this.productProps.groupPricing = this.addGroupPricing();
        this.changeModeAuto();
    }
    public alterPriceAcquisition(newValue: number, costProduct?: number) {
        this.productProps.priceAcquisition = newValue;
        if (costProduct !== undefined) {
            this.productProps.costProduct = costProduct;
        }
        this.productProps.marginProfit = this.calculateMarginProfit();
        this.productProps.groupPricing = new GroupPricing(this.productProps.marginProfit);
        this.changeModeAuto();
    }

    private calculateMarginProfit(): number {
        const { priceAcquisition, costProduct } = this.productProps;
        return ((priceAcquisition - costProduct) / priceAcquisition) * 100;
    }

    private addGroupPricing (): GroupPricing{
        return new GroupPricing(this.productProps.marginProfit as number);
    }

    public get allProductProps() {
        return {...this.productProps };
    }

    private changeModeAuto() {
        if (this.productProps.quantity <= 0) {
            this.inactivateProduct();
        }
    }
    //Inactivate/Activate automatically
    private inactivateProduct() {
        this.productProps.status = categoriesChange.withoutStock.status;
        this.productProps.justifyStatus = categoriesChange.withoutStock.justify;
        this.productProps.categoryOfChange = categoriesChange.withoutStock.categoryChange;
    }
}
