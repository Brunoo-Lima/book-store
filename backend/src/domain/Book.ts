import { AuthorDomain } from "./Author";
import { CategoryDomain } from "./Category";
import GroupPricing from "./GroupPricing";
import categoriesChange from "../utils/categoriesChange";

export interface BookProps {
    id?: string,
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
    authors: AuthorDomain[];
    year: number;
    categories: CategoryDomain[];
    title: string;
    publisher: string;
    edition: string;
    ISBN: string;
    pages: number;
    synopsis: string;
    width: number,
    height: number,
    weight: number,
    depth: number,
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

    public get id(): string | unknown {
        return this.bookProps.id;
    }
    get code() {
        return this.bookProps.code;
    }

    get title() {
        return this.bookProps.title;
    }

    get authors() {
        return this.bookProps.authors || [];
    }

    get categories() {
        return this.bookProps.categories || [];
    }

    get year() {
        return this.bookProps.year;
    }

    public get pages(): number {
        return this.bookProps.pages;
    }

    get ISBN() {
        return this.bookProps.ISBN;
    }

    get edition() {
        return this.bookProps.edition;
    }

    get totalPages() {
        return this.bookProps.pages;
    }

    get synopsis() {
        return this.bookProps.synopsis;
    }

    get priceAcquisition() {
        return this.bookProps.priceAcquisition;
    }
    get width() {
        return this.bookProps.width;
    }
    get height() {
        return this.bookProps.height;
    }
    get depth() {
        return this.bookProps.depth;
    }

    get weight() {
        return this.bookProps.weight;
    }

    get barCode() {
        return this.bookProps.codeBar;
    }

    get publisher() {
        return this.bookProps.publisher;
    }

    public get groupPricing(): GroupPricing {
        return this.groupPricing;
    }

    public get costProduction() : number{
        return this.costProduction;
    }


    public get categoryChange() : string {
        return this.categoryChange;
    }

    public get justifyStatus() : string {
        return this.justifyStatus;
    }

    public get status() : string {
        return this.status;
    }

    public static validISBN(): boolean {
        return true;
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
    public static createBook(bookData: Partial<BookProps>): Book {
        const defaultBookData: BookProps = {
            code: "UNDEFINED",
            status: "INACTIVATE",
            codeBar: "UNDEFINED",
            priceAcquisition: 0,
            costProduct: 0,
            quantity: 0,
            authors: {} as AuthorDomain[],
            year: 0,
            categories: {} as CategoryDomain[],
            title: "UNDEFINED",
            publisher: "UNDEFINED",
            edition: "UNDEFINED",
            ISBN: "UNDEFINED",
            pages: 0,
            synopsis: "UNDEFINED",
            width: 0,
            height: 0,
            weight: 0,
            depth: 0,
        };

        const mergedBookData = { ...defaultBookData, ...bookData };
        return new Book(mergedBookData);
    }

}
