import { Product } from "@prisma/client";
import { prisma } from "../../Config/Database/prisma/prismaClient";
import { IStrategy } from "../../interfaces/IStrategy";

import { Sales } from "../entities/Purchase/Sales";

export class ValidProductsInStock implements IStrategy{
    async process(sale: Sales) {
        try {
            let hasError = false
            await Promise.all(sale.item.map(async (it) => {
                const productExist = await prisma.product.findFirst({
                    select: {
                        pro_quantity: true
                    },
                    where: {
                        pro_id: it.product.id
                    }
                }) as Product
                if("pro_quantity" in productExist && productExist.pro_quantity < Number(it.quantity)){
                    hasError = true
                }
            }))
            if(hasError){
                return {
                    error: 'The quantity to sale is grater than quantity of product !'
                }
            }
            return {
                success: 'Quantity is valid !'
            }
        } catch (error) {
            return {
                error
            }
        }
    }
}
