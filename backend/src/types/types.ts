export enum Inactivate {
    WITHOUT_STOCK = 'WITHOUT_STOCK'
}

export type QueryProps = {
    boo_code?: string;
    boo_title?: string;
    boo_year?: number;
    boo_status?: "ACTIVATE" | "INACTIVATE";
    boo_justify_status?: string;
    boo_category_change?: string;
    boo_bar_code?: string;
    boo_price_acquisition?: number;
    boo_cost_product?: number;
    boo_edition?: string;
    boo_publisher?: string;
    boo_ISBN?: string;
    boo_pages?: number
    boo_synopsis?: string;
    boo_width?: number
    boo_height?: number;
    boo_weight?: number;
    boo_depth?: number;
    boo_aut_name?: string[],
    boo_cte_name?: string[],
    boo_grp_name?: string,
}

//To create new keys in object
export interface LooseObject {
    [key: string]: any
}

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
    width: number;
    height: number;
    weight: number;
    depth: number;
    groupPricing: string;
}

export interface LogsChange {
    change: {
        user_id: string,
        product_id: string,
        description: string,
    }
}
