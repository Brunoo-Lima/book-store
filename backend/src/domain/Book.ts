import { AuthorDomain } from "./Author";
import { CategoryDomain } from "./Category";
import Product, { ProductProps } from "./Product";

export interface BookProps extends ProductProps {
    code: string;
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

    //Method factory to create a new default book
    public static createBook(bookData: Partial<BookProps>): Book {
        const defaultBookData: BookProps = {
            justifyStatus: 'CREATED NEW BOOK',
            categoryOfChange: "ACTIVATE DEFAULT",
            code: "UNDEFINED",
            status: "ACTIVATE",
            codeBar: "UNDEFINED",
            priceAcquisition: 0,
            costProduct: 0,
            quantity: 0,
            authors: {} as AuthorDomain[],
            year: 0,
            categories: {} as CategoryDomain[],
            title: "WITHOUT TITLE",
            publisher: "WITHOUT PUBLISHER",
            edition: "WITHOUT EDITION",
            ISBN: "UNDEFINED",
            pages: 0,
            synopsis: "WITHOUT ",
            width: 0,
            height: 0,
            weight: 0,
            depth: 0,
        };

        const mergedBookData = { ...defaultBookData, ...bookData };
        return new Book(mergedBookData);
    }

}
