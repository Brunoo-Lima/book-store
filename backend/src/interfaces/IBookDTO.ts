export interface IBookDTO {
    bookData: {
        boo_code: string;
        boo_title: string;
        boo_year: number;
        boo_status?: "ACTIVATE" | "INACTIVATE";
        boo_author: string[];
        boo_categories: string[];
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
        boo_group_pricing: {
            type: string;
            percent: number;
        };
    }
}
