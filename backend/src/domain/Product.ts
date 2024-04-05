import GroupPricing from "./GroupPricing";
import categoriesChange from "../utils/categoriesChange";

export interface ProductProps{
    code: string;
    status?: boolean | null;
    justifyStatus?: string | null;
    categoryOfChange?: string | null;
    codeBar: string;
    priceAcquisition: number;
    costProduct: number;    //Include expense
    quantity: number;
    created_at: number;
    updated_at: number;
}

export default abstract class Product {
    private groupPricing: GroupPricing;
    private marginProfit: number;

    constructor(private productProps: ProductProps){
        this.marginProfit =this.validationMarginProfit();
        this.groupPricing = this.addGroupPricing();
        this.changeModeAuto();
    }
    public alterPriceAcquisition (newValue: number, costProduct?: number) {
        if(costProduct) this.productProps.costProduct = costProduct;
        this.productProps.priceAcquisition = newValue;
        this.marginProfit = this.validationMarginProfit();
        this.groupPricing = this.addGroupPricing();
    }

    // Necessary of review because it's with bug
    private validationMarginProfit (): number{
        const marginProfit = (this.productProps.priceAcquisition - this.productProps.costProduct);
        const profitPercent = marginProfit * 100;
        return Number(profitPercent.toFixed(2));
    }
    private addGroupPricing (): GroupPricing{
        return new GroupPricing(this.marginProfit);
    }

    public getGroupPricing (): GroupPricing {
        return this.groupPricing;
    }
    //Inactivate/Activate automatically
    private changeModeAuto( ) {
        // Prevents the quantity from being less than 0
        if(this.productProps.quantity < 0 ) this.productProps.quantity = 0;
        if(this.productProps.quantity === 0){
            this.productProps = {
                ...this.productProps,
                status: categoriesChange.withoutStock.status,
                justifyStatus: categoriesChange.withoutStock.justify,
                categoryOfChange: categoriesChange.withoutStock.categoryChange
            }
        }
    }
}
