import { AuthorDomain } from "./Author";
import { CategoryDomain } from "./Category";
import EntityErrorException from "./Errors/EntityErrorException";
import Product, { ProductProps } from "./Product";
import ISBN from "./Validations/ISBN";

export interface BookProps extends ProductProps {
    code: string;
    authors: AuthorDomain[];
    year: number;
    categories: CategoryDomain[];
    title: string;
    publisher: string;
    edition: string;
    readonly ISBN: string;
    pages: number;
    synopsis: string;
    width: number,
    height: number,
    weight: number,
    depth: number,
}

export default class Book extends Product {
    constructor(private bookProps: BookProps) {
        super({
            status: bookProps.status,
            justifyStatus: bookProps.justifyStatus,
            categoryOfChange: bookProps.categoryOfChange,
            codeBar: bookProps.codeBar,
            priceAcquisition: bookProps.priceAcquisition,
            costProduct: bookProps.costProduct,
            quantity: bookProps.quantity,
        });
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

    get pages(): number {
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
    public isbnValidated(value: string): boolean{
        const isbn = new ISBN(value).validISBN();
        return isbn;
    }
}
