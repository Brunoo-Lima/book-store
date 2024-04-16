import { LooseObject, QueryProps, BookDTO} from "../types/types";


export default class ValidObjectBook {
    private convertObjectToQuery(data: BookDTO){
        const objectConverted: QueryProps = {
            boo_bar_code: data.codeBar,
            boo_category_change: data.categoryOfChange,
            boo_code: data.code,
            boo_cost_product: data.costProduct,
            boo_depth: data.depth,
            boo_edition: data.edition,
            boo_height: data.height,
            boo_ISBN: data.ISBN,
            boo_justify_status: data.justifyStatus,
            boo_pages: data.pages,
            boo_price_acquisition: data.priceAcquisition,
            boo_publisher: data.publisher,
            boo_status: data.status,
            boo_synopsis: data.synopsis,
            boo_title: data.title,
            boo_weight: data.weight,
            boo_width: data.width,
            boo_year: data.year,
            boo_aut_name: data.authors,
            boo_cte_name: data.categories,
            boo_grp_name: data.groupPricing,
        }
        return objectConverted;
    }
    public removeValuesUndefined(data: BookDTO): QueryProps {
        const dataQueryBook: LooseObject = this.convertObjectToQuery(data);

        for (const key in dataQueryBook) {
            if (dataQueryBook.hasOwnProperty(key) && dataQueryBook[key] === undefined) {
                delete dataQueryBook[key];
            }
        }
        return dataQueryBook;
    }
}
