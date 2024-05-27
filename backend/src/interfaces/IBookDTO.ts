export interface IBookDTO {
    status: "ACTIVATE" | "INACTIVATE";
    justifyStatus: string;
    categoryOfChange: string;
    codeBar: string;
    priceAcquisition: number;
    costProduct: number;    //Include expense
    quantity: number;
    code: string;
    authors: Array<string>;
    year: number;
    categories: Array<string>;
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
    groupPricing: {
        type: string,
        percent: number; //This'll be a float number
    }
}
