export interface BookDTO {
    code: string;
    status: "ACTIVATE" | "INACTIVATE";
    justifyStatus: string;
    categoryOfChange: string;
    codeBar: string;
    priceAcquisition: number;
    costProduct: number;
    quantity: number;
    author: string;
    year: number;
    categories: string[];
    title: string;
    publisher: string;
    edition: string;
    ISBN: string;
    pages: number;
    synopsis: string;
    dimensions: {

    }
    created_at?: number;
    updated_at?: number;
}
