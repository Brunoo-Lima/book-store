/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from "../../../../Model/domain/Product";
import { prisma } from "../../prisma/prismaClient";
import { DAO } from "../DAO";

export class ProductDao extends DAO{
    public async create(product: Product): Promise<unknown> {
        return await prisma.product.create({
            data: {
                pro_id: product.id,
                pro_name: product.name,
                pro_price: `${product.price}`,
                pro_quantity: product.quantity
            }
        })
    }
    public update(product: Product): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    public delete(product: Product): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    public find(product: Product): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    public findMany(product: Product): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

}
