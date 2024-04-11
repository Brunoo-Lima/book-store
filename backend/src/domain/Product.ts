import GroupPricing from "./GroupPricing";
import Validator from "./Validations/Validators";


export interface ProductProps {
    status: "ACTIVATE" | "INACTIVATE";
    justifyStatus: string;
    categoryOfChange: string;
    codeBar: string;
    priceAcquisition: number;
    costProduct: number;    //Include expense
    quantity: number;
}

export default abstract class Product {
    private groupPricing: GroupPricing;
    private marginProfit: number;

    constructor(private productProps: ProductProps){
        this.marginProfit = this.calculateMarginProfit(this.productProps.priceAcquisition);
        this.groupPricing = this.addGroupPricing();
        this.checkQuantity(productProps.quantity);
    }

    get priceAcquisition() {
        return this.productProps.priceAcquisition;
    }
    public get groupPricingIs(): GroupPricing {
        return this.groupPricing!;
    }

    public get costProduct() : number{
        return this.productProps.costProduct;
    }

    public get categoryChange() : string {
        return this.productProps.categoryOfChange!;
    }

    public get justifyStatus() : string {
        return this.productProps.justifyStatus!;
    }

    public get status() : string {
        return this.productProps.status;
    }
    public get quantity(): number {
        return this.productProps.quantity;
    }
    public alterPriceAcquisition(newValue: number, costProduct?: number): boolean {

        //If someone sent the cost, the calculate is other
        if (costProduct) this.productProps.costProduct = costProduct;
        const marginProfit = this.calculateMarginProfit(newValue);
        const typePricing = Validator.validateTypePricing(marginProfit);

        //Check that the margin profit is the same as the margin class
        if(typePricing === this.groupPricing?.typePricingIs){
            this.productProps.priceAcquisition = newValue;
            this.marginProfit = marginProfit;
            return true;
        }
        return false;
    }

    private calculateMarginProfit(priceProduct: number): number {
        const { costProduct } = this.productProps;
        if(costProduct === 0 || priceProduct === 0) return 0;
        return ((priceProduct - costProduct) / priceProduct) * 100;
    }
    private addGroupPricing(): GroupPricing {
        return new GroupPricing(this.marginProfit as number);
    }

    //Inactivate/Activate automatically
    private changeStatus(status:string, justify:string) {
        //This function should verify if the book
    }

    //This validation can be in the front-end
    private checkQuantity(quantity: number){
        if(quantity < 0) this.productProps.quantity = 0;
    }
}
