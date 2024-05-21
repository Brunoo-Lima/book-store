import { randomUUID } from "crypto";
import EntityDomain from "./EntityDomain";
import GroupPricing from "./GroupPricing";
import MarginProfitValidator from "./Validations/MarginProfit";



export interface ProductProps {
    status: "ACTIVATE" | "INACTIVATE";
    justifyStatus: string;
    categoryOfChange: string;
    codeBar: string;
    priceAcquisition: number;
    costProduct: number;    //Include expense
    quantity: number;
}

export default abstract class Product extends EntityDomain{
    private groupPricing: GroupPricing | null = null;

    constructor(private productProps: ProductProps){
        const date = Date.toString();
        super(randomUUID(), date, date);
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

    //I cannot modify the price acquisition if the group pricing is different
    public alterPriceAcquisition(newPrice: number, costProduct?: number): boolean {
        let valid = false

        //If the product cost is other, i use the new product cost, else, i use the old cost
        const cost = costProduct || this.costProduct
        const newGroupPricing = this.addGroupPricing(newPrice, cost);

        if(this.groupPricingIs.typePricingIs === newGroupPricing.typePricingIs){
            if(costProduct) this.productProps.costProduct = costProduct

            this.groupPricing = newGroupPricing;
            this.productProps.priceAcquisition = newPrice
            valid = true
        }
        return valid;
    }

    private addGroupPricing(priceAcquisition: number, costProduct: number){
        const marginProfit = MarginProfitValidator.calculateMarginProfit(priceAcquisition, costProduct)
        return  new GroupPricing(marginProfit);
    }

    //Inactivate/Activate automatically
    protected changeStatus(status:"ACTIVATE" | "INACTIVATE", justify:string) {
        this.productProps.status = status;
        this.productProps.justifyStatus = justify;
    }

    //This validation can be in the front-end
    private checkQuantity(quantity: number){
        if(quantity < 0) this.productProps.quantity = 0;
    }
}
