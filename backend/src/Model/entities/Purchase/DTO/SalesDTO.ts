import { ProductDTO } from "./ProductDTO";

export interface SalesDTO {
    id_sales: string | ""
    dateSale: Date;
    client: {
        id: string,
        cpf: string
    };
    status: string;
    items: [
        {
            item: {
                id: string | "" // Se o id for enviado quer dizer que é para atualizar
                price_product_sale: number; // Preço do produto no momento da venda
                product: ProductDTO
            }
        }
    ];
    delivery: {
        id: string | ""
        status: string;
        dateInitial: string;
        dateFinal: string;
    }
}
