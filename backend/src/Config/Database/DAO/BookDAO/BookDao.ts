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
                    boo_title: "Nome do Livro",
                    boo_year: "2024",
                    boo_edition: "1ª Edição",
                    boo_isbn: "123-4567891234",
                    boo_page_numbers: 320,
                    boo_synopses: "Sinopse do livro...",
                    boo_height: 20.5,
                    boo_width: 15.2,
                    boo_weight: 0.8,
                    boo_depth: 3.0,
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
                    },

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
