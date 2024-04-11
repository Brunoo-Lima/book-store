export interface BookDTO {
    code: string;
    status: "ACTIVATE" | "INACTIVATE";
    justifyStatus: string;
    categoryOfChange: string;
    codeBar: string;
    priceAcquisition: number;
    costProduct: number;    //Include expense
    quantity: number;
    marginProfit?: number;
    authors: Array<string>;
    year: number;
    categories: Array<string>;
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
