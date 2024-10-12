import { Request, Response } from "express";
import { ProductDTO } from "../../Model/DTO/ProductDTO";
import { Product } from "../../Model/domain/Product";
import { Facade } from "../Facade/Facade";
import { Product as ProductPrisma } from '@prisma/client'

export class CreateProductController {
    async handle(req: Request, res: Response){
        try {
            const productDto = req.body as ProductDTO
            const productDomain = new Product(productDto.name, productDto.product_price, productDto.quantity)

            const facade = new Facade(productDomain)
            const productCreated = await facade.create() as ProductPrisma

            if("error" in productCreated){
                return res.json({
                    error: productCreated.error
                })
            }
            return res.json({
                success: true,
                product: productCreated
            })

        } catch (error) {
            return res.json({
                error
            })
        }
    }
}
