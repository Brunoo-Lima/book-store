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

    private validationMarginProfit (): number{
        const { priceAcquisition, costProduct } = this.productProps;
        const marginProfit = ((priceAcquisition - costProduct) / priceAcquisition) * 100
        return marginProfit;
    }
    private addGroupPricing (): GroupPricing{
        return new GroupPricing(this.marginProfit);
    }

    public get allProductProps() {
        return this.productProps;
    }


    public getGroupPricing (): string {
        return this.groupPricing.typeGroupPricing;
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
