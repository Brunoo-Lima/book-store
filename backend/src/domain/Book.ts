import { randomUUID } from "crypto";
import { Author } from "./Author";
import { Category } from "./Category";
import EntityDomain from "./EntityDomain";
import { GroupPricing } from "./GroupPricing";
import { IBookDTO } from "../interfaces/IBookDTO";

export interface BookProps {
    boo_code: string;
    boo_title: string;
    boo_year: number;
    boo_status?: "ACTIVATE" | "INACTIVATE";
    boo_group_pricing: GroupPricing;
    boo_author: Author[];
    boo_categories: Category[];
    boo_justify_status?: string;
    boo_category_change?: string;
    boo_bar_code: string;
    boo_price_acquisition: number;
    boo_edition: string;
    boo_publisher: string;
    boo_ISBN: string;
    boo_pages: number;
    boo_synopsis: string;
    boo_width: number;
    boo_height: number;
    boo_weight: number;
    boo_depth: number;
}

export default class Book extends EntityDomain {
    private bookProps: BookProps;

    constructor(bookProps: BookProps) {
        const date = new Date();
        super(randomUUID(), date.toISOString(), date.toISOString());
        this.bookProps = bookProps;
    }

    // Getters
    get boo_code(): string {
        return this.bookProps.boo_code;
    }

    get boo_title(): string {
        return this.bookProps.boo_title;
    }

    get boo_year(): number {
        return this.bookProps.boo_year;
    }

    get boo_status(): "ACTIVATE" | "INACTIVATE" {
        return this.bookProps.boo_status!;
    }

    get boo_group_pricing(): GroupPricing {
        return this.bookProps.boo_group_pricing;
    }

    get boo_author(): Author[] {
        return this.bookProps.boo_author;
    }

    get boo_categories(): Category[] {
        return this.bookProps.boo_categories;
    }

    get boo_justify_status(): string | undefined {
        return this.bookProps.boo_justify_status;
    }

    get boo_category_change(): string | undefined {
        return this.bookProps.boo_category_change;
    }

    get boo_bar_code(): string {
        return this.bookProps.boo_bar_code;
    }

    get boo_price_acquisition(): number {
        return this.bookProps.boo_price_acquisition;
    }

    get boo_edition(): string {
        return this.bookProps.boo_edition;
    }

    get boo_publisher(): string {
        return this.bookProps.boo_publisher;
    }

    get boo_ISBN(): string {
        return this.bookProps.boo_ISBN;
    }

    get boo_pages(): number {
        return this.bookProps.boo_pages;
    }

    get boo_synopsis(): string {
        return this.bookProps.boo_synopsis;
    }

    get boo_width(): number {
        return this.bookProps.boo_width;
    }

    get boo_height(): number {
        return this.bookProps.boo_height;
    }

    get boo_weight(): number {
        return this.bookProps.boo_weight;
    }

    get boo_depth(): number {
        return this.bookProps.boo_depth;
    }

    // Setters
    set boo_code(value: string) {
        this.bookProps.boo_code = value;
    }

    set boo_title(value: string) {
        this.bookProps.boo_title = value;
    }

    set boo_year(value: number) {
        this.bookProps.boo_year = value;
    }

    set boo_status(value: "ACTIVATE" | "INACTIVATE") {
        this.bookProps.boo_status = value;
    }

    set boo_group_pricing(value: GroupPricing) {
        this.bookProps.boo_group_pricing = value;
    }

    set boo_author(value: Author[]) {
        this.bookProps.boo_author = value;
    }

    set boo_categories(value: Category[]) {
        this.bookProps.boo_categories = value;
    }

    set boo_justify_status(value: string | undefined) {
        this.bookProps.boo_justify_status = value;
    }

    set boo_category_change(value: string | undefined) {
        this.bookProps.boo_category_change = value;
    }

    set boo_bar_code(value: string) {
        this.bookProps.boo_bar_code = value;
    }

    set boo_price_acquisition(value: number) {
        this.bookProps.boo_price_acquisition = value;
    }

    set boo_edition(value: string) {
        this.bookProps.boo_edition = value;
    }

    set boo_publisher(value: string) {
        this.bookProps.boo_publisher = value;
    }

    set boo_ISBN(value: string) {
        this.bookProps.boo_ISBN = value;
    }

    set boo_pages(value: number) {
        this.bookProps.boo_pages = value;
    }

    set boo_synopsis(value: string) {
        this.bookProps.boo_synopsis = value;
    }

    set boo_width(value: number) {
        this.bookProps.boo_width = value;
    }

    set boo_height(value: number) {
        this.bookProps.boo_height = value;
    }

    set boo_weight(value: number) {
        this.bookProps.boo_weight = value;
    }

    set boo_depth(value: number) {
        this.bookProps.boo_depth = value;
    }
    static createBook({ bookData }: IBookDTO): Book {
        const defaultValues: BookProps = {
            boo_code: "DEFAULT",
            boo_title: "DEFAULT",
            boo_year: 0,
            boo_status: "ACTIVATE",
            boo_author: [],
            boo_categories: [],
            boo_justify_status: "DEFAULT",
            boo_category_change: "DEFAULT",
            boo_bar_code: "DEFAULT",
            boo_price_acquisition: 0,
            boo_edition: "DEFAULT",
            boo_publisher: "DEFAULT",
            boo_ISBN: "DEFAULT",
            boo_pages: 0,
            boo_synopsis: "DEFAULT",
            boo_width: 0,
            boo_height: 0,
            boo_weight: 0,
            boo_depth: 0,
            boo_group_pricing: new GroupPricing("DEFAULT", 0),
        }
        // Mesclar dados fornecidos com valores padrão
        const bookProps: BookProps = {
            ...defaultValues,
            ...bookData,
            boo_group_pricing: bookData.boo_group_pricing
                ? new GroupPricing(bookData.boo_group_pricing.type, bookData.boo_group_pricing.percent)
                : defaultValues.boo_group_pricing,
            boo_author: bookData?.boo_author ? Author.createAuthors(bookData.boo_author) : defaultValues.boo_author,
            boo_categories: bookData?.boo_categories ? Category.createCategories(bookData.boo_categories) : defaultValues.boo_categories,
        };

        return new Book(bookProps);
    }
    cleanDefaultValues() {
        for (const [key, value] of Object.entries(this.bookProps)) {
            const keyObject = key as keyof BookProps;

            if(Array.isArray(value) && value.length === 0) delete this.bookProps[keyObject];
            if (typeof value === 'string' && value === "DEFAULT") delete this.bookProps[keyObject];
            if (typeof value === 'number' && value === 0) delete this.bookProps[keyObject];
            if (value === undefined) delete this.bookProps[keyObject];
        }
    }

}
