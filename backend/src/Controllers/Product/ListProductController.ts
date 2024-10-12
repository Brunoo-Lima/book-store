import { Request, Response } from "express";
import { ProductDTO } from "../../Model/DTO/ProductDTO";
import { Product } from "../../Model/domain/Product";
import { Facade } from "../Facade/Facade";

export class ListProductController {
    async handle(req: Request, res: Response){
        try {
            const product = req.body as ProductDTO
            const productDomain = new Product(product.name, product.product_price, product.quantity)
            const facade = new Facade(productDomain)
            const productsList = await facade.findMany()

            if(!productsList){
                return res.json({
                    error: 'Sorry but does not exists products :('
                })
            }
            return res.json({
                success: true,
                products: productsList
            })

        } catch (error) {
            return res.json({
                error: error
            })
        }
    }
}
