import { randomUUID } from "crypto";
import EntityDomain from "./EntityDomain";

export interface ProductProps {
    status: "ACTIVATE" | "INACTIVATE";
    justifyStatus: string;
    categoryOfChange: string;
    codeBar: string;
    priceAcquisition: number;
    costProduct: number;    //Include expense
    quantity: number;
    groupPricing: {
        type: string,
        percent: number;
    };
}

export default abstract class Product extends EntityDomain {

    constructor(private productProps: ProductProps) {
        const date = Date.toString();
        super(randomUUID(), date, date);
    }

    public get priceAcquisition(): number {
        return this.productProps.priceAcquisition;
    }

    public set priceAcquisition(value: number) {
        this.productProps.priceAcquisition = value;
    }

    public get groupPricingIs(): object {
        return this.productProps.groupPricing;
    }

    public set groupPricingIs(value: any) { //Verify the type
        this.productProps.groupPricing = value;
    }

    public get costProduct(): number {
        return this.productProps.costProduct;
    }

    public set costProduct(value: number) {
        this.productProps.costProduct = value;
    }

    public get categoryChange(): string {
        return this.productProps.categoryOfChange!;
    }

    public set categoryChange(value: string) {
        this.productProps.categoryOfChange = value;
    }

    public get justifyStatus(): string {
        return this.productProps.justifyStatus!;
    }

    public set justifyStatus(value: string) {
        this.productProps.justifyStatus = value;
    }

    public get status(): string {
        return this.productProps.status;
    }

    public set status(value: "ACTIVATE" | "INACTIVATE") {
        this.productProps.status = value;
    }

    public get quantity(): number {
        return this.productProps.quantity;
    }

    public set quantity(value: number) {
        this.productProps.quantity = value;
    }

    //Inactivate/Activate automatically
    protected changeStatus(status: "ACTIVATE" | "INACTIVATE", justify: string) {
        this.productProps.status = status;
        this.productProps.justifyStatus = justify;
    }
}
