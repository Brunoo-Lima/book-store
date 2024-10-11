
export interface SalesDTO {
    id_sales: string | ""
    dateSale: Date;
    client_id: string;
    status: string;
    items: [
        {
            item: {
                id: string | "" // Se o id for enviado quer dizer que é para atualizar
                product_id: string
                quantity: number;
                product_price: number; // Preço do produto no momento da venda
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
