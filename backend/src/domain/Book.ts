import Author from "./Author";
import Category from "./Category"; "./Category";
import Dimensions from "./Dimensions";
import GroupPricing from "./GroupPricing";
import categoriesChange from "../utils/categoriesChange";
import Publisher from "./Publisher";

export interface BookProps {
    code: string;
    status: "ACTIVATE" | "INACTIVATE";
    justifyStatus?: string;
    categoryOfChange?: string;
    codeBar: string;
    priceAcquisition: number;
    costProduct: number;    //Include expense
    quantity: number;
    groupPricing?: GroupPricing;
    marginProfit?: number
    author: Author;
    year: number;
    categories: Category;
    title: string;
    publisher: Publisher;
    edition: string;
    ISBN: string;
    pages: number;
    synopsis: string;
    dimensions: Dimensions
    created_at?: number;
    updated_at?: number;
}

export default class Book {
    constructor(private bookProps: BookProps) {
        this.bookProps.created_at = Date.now();
        this.bookProps.updated_at = Date.now();
        this.bookProps.marginProfit = this.calculateMarginProfit();
        this.bookProps.groupPricing = this.addGroupPricing();
        this.changeModeAuto();
    }
    public static validISBN(): boolean {
        return true;
    }
    public get allBookProps() {
        return { ...this.bookProps }
    }
    public alterPriceAcquisition(newValue: number, costProduct?: number) {
        this.bookProps.priceAcquisition = newValue;
        if (costProduct !== undefined) {
            this.bookProps.costProduct = costProduct;
        }
        this.bookProps.marginProfit = this.calculateMarginProfit();
        this.bookProps.groupPricing = new GroupPricing(this.bookProps.marginProfit);
        this.changeModeAuto();
    }

    private calculateMarginProfit(): number {
        const { priceAcquisition, costProduct } = this.bookProps;
        return ((priceAcquisition - costProduct) / priceAcquisition) * 100;
    }

    private addGroupPricing(): GroupPricing {
        return new GroupPricing(this.bookProps.marginProfit as number);
    }

    //Inactivate/Activate automatically
    private changeModeAuto() {
        if (this.bookProps.quantity <= 0) {
            this.inactivateProduct();
            this.bookProps.quantity = 0;
        }
    }
    private inactivateProduct() {
        this.bookProps.status = "INACTIVATE"
        this.bookProps.justifyStatus = categoriesChange.withoutStock.justify;
        this.bookProps.categoryOfChange = categoriesChange.withoutStock.categoryChange;
    }
    public bookToJson(): string {
        return JSON.stringify(this.bookProps);
    }
}
