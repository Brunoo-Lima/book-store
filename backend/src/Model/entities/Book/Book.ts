import { Category } from "./Categories/Categories";
import { PricingGroup } from "../Purchase/PricingGroup";
import { Author } from "./Authors/Author";
import { DimensionProps } from "./Dimensions/Dimensions";
import { Publisher } from "./Publisher/Publisher";
import { Product } from "../Purchase/Product";
import { bookDTO } from "./DTO/bookDTO";
import { TypePricing } from "../Purchase/PricingGroup";

export interface BookProps {
    title: string;
    year: number;
    edition: string;
    ISBN: string;
    pageNumber: number;
    synopses: string;
    dimensions: DimensionProps;
    authors: Array<Author>;
    categories: Array<Category>;
    publisher: Array<Publisher>;
    pricingGroup: PricingGroup;
    codeBar: string;
    price: number;
    quantity: number
}

export class Book extends Product {
    constructor(private bookProps: BookProps) {
        super(bookProps.price, bookProps.quantity);
    }

    // Getters
    get title(): string {
        return this.bookProps.title;
    }

    get year(): number {
        return this.bookProps.year;
    }

    get edition(): string {
        return this.bookProps.edition;
    }

    get ISBN(): string {
        return this.bookProps.ISBN;
    }

    get pageNumber(): number {
        return this.bookProps.pageNumber;
    }

    get synopses(): string {
        return this.bookProps.synopses;
    }

    get dimensions(): DimensionProps {
        return this.bookProps.dimensions;
    }

    get authors(): Array<Author> {
        return this.bookProps.authors;
    }

    get categories(): Array<Category> {
        return this.bookProps.categories;
    }

    get publisher(): Array<Publisher> {
        return this.bookProps.publisher;
    }

    get pricingGroup(): PricingGroup {
        return this.bookProps.pricingGroup;
    }

    get codeBar(): string {
        return this.bookProps.codeBar;
    }

    // Setters
    set title(value: string) {
        this.bookProps.title = value;
    }

    set year(value: number) {
        this.bookProps.year = value;
    }

    set edition(value: string) {
        this.bookProps.edition = value;
    }

    set ISBN(value: string) {
        this.bookProps.ISBN = value;
    }

    set pageNumber(value: number) {
        this.bookProps.pageNumber = value;
    }

    set synopses(value: string) {
        this.bookProps.synopses = value;
    }

    set dimensions(value: DimensionProps) {
        this.bookProps.dimensions = value;
    }

    set authors(value: Array<Author>) {
        this.bookProps.authors = value;
    }

    set categories(value: Array<Category>) {
        this.bookProps.categories = value;
    }

    set publisher(value: Array<Publisher>) {
        this.bookProps.publisher = value;
    }

    set pricingGroup(value: PricingGroup) {
        this.bookProps.pricingGroup = value;
    }

    set codeBar(value: string) {
        this.bookProps.codeBar = value;
    }
}

export abstract class FactoryBook {
    static createBook(bookProps: bookDTO): Book {
        // Mapeamento dos autores
        const authors: Author[] = bookProps.authors
            ? bookProps.authors.map((author) => new Author(author))
            : [];

        // Mapeamento das categorias
        const categories = bookProps.categories ? bookProps.categories.map((category) => new Category(category)) : []

        // Mapeamento das editoras
        const publishers: Publisher[] = bookProps.publisher
            ? bookProps.publisher.map((publisher) => new Publisher(publisher))
            : [];

        // Criando o objeto Book com os dados mapeados
        return new Book({
            title: bookProps.title,
            year: bookProps.year,
            edition: bookProps.edition,
            ISBN: bookProps.isbn,
            pageNumber: bookProps.pages,
            synopses: bookProps.synopses,
            dimensions: bookProps.dimensions,
            authors: authors,
            categories: categories,
            publisher: publishers,
            pricingGroup: new PricingGroup({type: TypePricing.BRONZE}),
            codeBar: bookProps.codeBar,
            price: bookProps.price,
            quantity: bookProps.quantity
        });
    }
}
