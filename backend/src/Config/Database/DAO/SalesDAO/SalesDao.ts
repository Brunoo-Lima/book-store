/* eslint-disable @typescript-eslint/no-unused-vars */
import { Sales } from "../../../../Model/domain/Sales";
import { prisma } from "../../prisma/prismaClient";
import { DAO } from "../DAO";

export class SalesDao extends DAO {
    public async create(sales: Sales): Promise<unknown> { // Criar uma transação para dar baixa no estoque, assim só irá funcionar ambos juntos
        return await prisma.sale.create({
            data: {
                sal_id: sales.id,
                sal_date_sale: sales.dateSale,
                sal_date_update: new Date(sales.updatedAt),
                sal_status: sales.status as string,
                sal_item: {
                    createMany: {
                        data: sales.item.map((ite) => {
                            return {
                                ite_product_price: ite.product_price, //Preço do produto no momento da venda
                                ite_quantity: Number(ite.quantity),
                                fk_ite_pro_id: ite.product.id
                            }
                        })
                    }
                },
                sal_delivery: {
                    create: {
                        del_id: sales.delivery.id,
                        del_status: sales.delivery.status as string, // Status inicial da entrega
                        del_date_initial: sales.delivery.dateInitial,
                        del_date_final: sales.delivery.dateFinal
                    },
                },
                sal_client: {
                    connect: {
                        cli_id: sales.client.id
                    }
                }
            }
        })
    }
    public update(sales: Sales): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    public delete(sales: Sales): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    public async find(sales: Sales): Promise<unknown> {
        return await prisma.sale.findFirst({
            select: {
                sal_item: true,
                sal_client: true,
                sal_date_sale: true,
                sal_delivery: true,
                sal_status: true,
            },
            where:{
                sal_id: sales.id
            }
        })
    }
    public async findMany(sales: Sales): Promise<unknown> {
        // Caso seja necessário aplicar filtro, usamos a entidade de dominio
        return await prisma.sale.findMany({
            select: {
                sal_item: true,
                sal_client: true,
                sal_date_sale: true,
                sal_delivery: true,
                sal_status: true,
            },
            where: {
                sal_client:{
                    cli_cpf: sales.client.cpf.code
                }
            }
        })
    }

}
