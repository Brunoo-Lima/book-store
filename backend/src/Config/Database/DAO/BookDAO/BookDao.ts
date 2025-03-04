import { PricingGroup } from "@prisma/client";
import { IDao } from "../../../../interfaces/IDao";
import { Book } from "../../../../Model/entities/Book/Book";
import { EntityDomain } from "../../../../Model/entities/EntityDomain";
import { prisma } from "../../prisma/prismaClient";

export class BookDao implements IDao{
    async create(book: Book): Promise<unknown> {
       return await prisma.$transaction(async (prisma) => {
            const pricingGroup = await prisma.pricingGroup.create({
                data: {
                    pre_type: book.pricingGroup.type
                }
            }) as PricingGroup

            const book_created = await prisma.book.create({
                data: {
                    boo_title:book.title,
                    boo_year: `${book.year}`,
                    boo_edition: book.edition,
                    boo_isbn: book.ISBN,
                    boo_page_numbers: book.pageNumber,
                    boo_synopses: book.synopses,
                    boo_height: book.dimensions.height,
                    boo_width: book.dimensions.width,
                    boo_weight: book.dimensions.weight,
                    boo_depth: book.dimensions.depth,
                    // Conectar ou criar autores
                    boo_author: {
                        connectOrCreate: book.authors.map((author) => {
                            return {
                                where: {aut_name: author.name},
                                create: {aut_name: author.name}
                            }
                        })
                    },

                    // Conectar ou criar categorias
                    boo_categories: {
                        connectOrCreate: book.categories.map((category) => {
                            return {
                                where: {cte_name: category.name},
                                create: {cte_name: category.name}
                            }
                        })
                    },

                    // Conectar ou criar editoras
                    boo_publisher: {
                        connectOrCreate: book.publisher.map((publisher) => {
                            return {
                                where: {pub_name: publisher.name},
                                create: {pub_name: publisher.name}
                            }
                        })
                    },
                    boo_item_stock: {
                        create: {
                            ito_quantity: book.quantity
                        }
                    },
                    boo_pricing_Group: {
                        connect: {
                            pre_id: pricingGroup.pre_id
                        }
                    }
                }
            });
            return book_created
       })
    }
    update(entity: EntityDomain): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    delete(entity: EntityDomain): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    async find(entity: EntityDomain): Promise<unknown> {
        return null
    }
    findMany(entity: EntityDomain): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

}
