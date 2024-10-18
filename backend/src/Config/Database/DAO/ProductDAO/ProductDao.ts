/* eslint-disable @typescript-eslint/no-unused-vars */
import { IDao } from "../../../../interfaces/IDao";
import { Product } from "../../../../Model/domain/Product";
import { prisma } from "../../prisma/prismaClient";

export class ProductDao implements IDao{
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
    public async find(product: Product): Promise<unknown> {
        return await prisma.product.findFirst({
            select: {
                pro_id: true,
                pro_name: true,
                pro_price: true,
                pro_quantity: true
            },
            where: {
                pro_name: product.name
            }
        })
    }
    public async findMany(product: Product): Promise<unknown> {
        return await prisma.product.findMany({
            select: {
                pro_id: true,
                pro_price: true,
                pro_quantity: true,
                pro_name: true
            }
        })
    }

}
