import { prisma } from "../Database/prisma/prismaClient";
import { saleCompletedWebhook } from "./salesWebHook";
import { Status } from "../../Model/domain/types/Status";
import { SalesDTO } from "../../Model/DTO/SalesDTO";
import { Request, Response } from "express";

export default async function updateProfilePurchase(req: Request, res: Response){
    try {
        const salesDto = req.body.data as SalesDTO; // Dados da venda

        // 1. Processar a venda (salvar no banco, verificar status de aprovação, etc.)
        const sale = await prisma.sale.update({
            where: { sal_id: salesDto.id_sales },
            data: {
                sal_status: Status.DENY as string,  // Supondo que a venda foi aprovada
                sal_date_update: new Date(),
            },
            include: {
                sal_item: true,
                sal_client: true,
            }
        });

        if(!sale){
            return res.json({
                error: 'Sale do not Deny !'
            })
        }
        req.body.sale = sale
        return await saleCompletedWebhook(req, res)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error});
    }
}
