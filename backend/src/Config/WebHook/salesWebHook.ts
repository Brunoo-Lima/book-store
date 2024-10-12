import { Request, Response } from 'express';
import { Item} from '@prisma/client';
import { prisma } from '../Database/prisma/prismaClient';
import { getProfilePurchase } from '../../utils/getProfilePurchase';


// WebHook que será acionado quando uma venda for realizada
export async function saleCompletedWebhook(req: Request, res: Response) {
    try {
        const sale = req.body.data;
        const saleExist = await prisma.sale.findFirst({
            select: {
                sal_item: true
            },
            where: {
                sal_id: sale.sal_id
            }
        })
        if(!saleExist) return res.json({
            error: 'Sale not found !'
        })

        const client = await prisma.client.findUnique({
            where: { cli_id: sale.client.id }
        });

        if (!client) {
            return res.status(404).json({ message: 'Client not found!' });
        }

        // Calcular o novo ranking do cliente
        const { ranking, score, profile } = getProfilePurchase(
            client.cli_ranking,
            1,
            1
        );
        // Verificar se sal_item existe e é uma array
        // Processar todos os produtos da venda
        const allProducts = await Promise.all(saleExist.sal_item.map(async (item: Item) => {
            const itemDb = item as Item;

            const productExist = await prisma.product.findFirst({
                select: {
                    pro_quantity: true
                },
                where: {
                    pro_id: itemDb.fk_ite_pro_id
                }
            });

            if (productExist) {
                const updatedProduct = await prisma.product.update({
                    data: {
                        pro_quantity: productExist.pro_quantity - itemDb.ite_quantity
                    },
                    where: {
                        pro_id: itemDb.fk_ite_pro_id
                    }
                });
                return updatedProduct;
            }
            return null
        }));

        // Atualizar as informações do cliente
        const clientUpdated = await prisma.client.update({
            where: { cli_id: client.cli_id },
            data: {
                cli_ranking: ranking,
                cli_score: score,
                cli_profilePurchase: profile
            }
        });
        if(!clientUpdated && !allProducts){
            return res.json({
                error: 'Sale cannot be deny !'
            })
        }
        return res.json({
            success: true,
            message: 'Sale completed successfully and ranking updated!',
            updatedProducts: allProducts,
            updatedClient: clientUpdated
        });

    } catch (error) {
        console.error('Transaction failed:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}
