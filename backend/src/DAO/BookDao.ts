import { Books } from "@prisma/client";
import Book from "../domain/Book";
import EntityDomain from "../domain/EntityDomain";
import { IDao } from "../interfaces/IDao";
import { prisma } from "../prisma/prismaClient";

export default class BookDao implements IDao {
    async create(book: Book): Promise<Object | null> {
        return await prisma.books.create({
            data: {
                boo_title: book.title,
                boo_synopsis: book.synopsis,
                boo_year: book.year,
                boo_bar_code: book.barCode,
                boo_category_change: book.categoryOfChange,
                boo_code: book.code,
                boo_depth: book.depth,
                boo_height: book.height,
                boo_weight: book.weight,
                boo_width: book.width,
                boo_edition: book.edition,
                boo_ISBN: book.ISBN,
                boo_justify_status: book.justifyStatus,
                boo_pages: book.pages,
                boo_price_acquisition: book.priceAcquisition,
                boo_publisher: book.publisher,
                boo_status: book.status as string,
                fk_boo_grp_id: book.groupPricing.idEntity as string,
                fk_boo_aut_id: {
                    connect: book.authors.map((author) => {
                        return { aut_id: author.idEntity as string};
                    })
                },
                fk_boo_cte_id: {
                    connect: book.categories.map((category) => {
                        return {
                            cte_id: category.idEntity as string,
                        }
                    })
                },
                created_at: new Date(book.dateCreate),
                updated_at: new Date(book.dateUpdate)
            }
        });
    }

    async update(book: Book): Promise<Object | null> {
        const bookExist = await this.find(book)  as Books;
        if(!bookExist) return null;

        return await prisma.books.update({
            data: {},
            where: {
                boo_title: book.title
            }
        })
    }

    async find(book: Book): Promise<Object | null> {
        return await prisma.books.findFirst({
            where: {
                boo_title: book.title,
            }
        });
    }

    async inactivate(book: Book): Promise<Object | null> {
        return await prisma.books.update({
            data: {
                boo_status: book.status,
            },
            where: {
                boo_id: book.idEntity as string
            }
        });
    }
}
