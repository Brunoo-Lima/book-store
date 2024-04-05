import Author from "./Author";
import {Category} from "./Category";
import Dimensions from "./Dimensions";
import Product, { ProductProps } from "./Product";
import Publisher from "./Publisher";

export interface BookProps extends ProductProps{
    author: Author;
    year: number;
    categories: Array<Category>;
    title: string;
    publisher: Publisher;
    edition: string;
    ISBN: string;
    pages: number;
    synopsis: string;
    dimensions: Dimensions
}

export default class Book extends Product {
    constructor(private bookProps: BookProps & ProductProps) {
        super({
            code: bookProps.code,
            status: bookProps.status,
            justifyStatus: bookProps.justifyStatus,
            categoryOfChange: bookProps.categoryOfChange,
            codeBar: bookProps.codeBar,
            priceAcquisition: bookProps.priceAcquisition,
            costProduct: bookProps.costProduct,
            created_at: bookProps.created_at,
            updated_at: bookProps.updated_at,
            quantity: bookProps.quantity
        });
    }
    public static validISBN(): boolean {
        return true;
    }
    public get allBookProps()  {
        return {...this.bookProps, ...this.allProductProps}
    }

}
