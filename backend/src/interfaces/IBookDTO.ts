export interface IBookDTO {
    bookData: {
        code: string;
        status: "ACTIVATE" | "INACTIVATE";
        justifyStatus: string;
        categoryOfChange: string;
        codeBar: string;
        priceAcquisition: number;
        costProduct: number;
        quantity: number;
        authors: string[];
        year: number;
        categories: string[];
        title: string;
        publisher: string;
        edition: string;
        ISBN: string;
        pages: number;
        synopsis: string;
        width: number;
        height: number;
        weight: number;
        depth: number;
        groupPricing: {
            type: string;
            percent: number;
        };
    }
}
