import { Books } from "@prisma/client";
import Book from "../domain/Book";
import { IDao } from "../interfaces/IDao";
import { prisma } from "../prisma/prismaClient";

export default class BookDao implements IDao {
    async create(book: Book): Promise<Object | null> {
        console.log(book);
        return await prisma.books.create({
            data: {
                boo_id: book.idEntity,
                boo_title: book.boo_title,
                boo_code: book.boo_code, //Verificar se vai ser o usúario que vai informar
                boo_ISBN: book.boo_ISBN,
                boo_year: book.boo_year,
                boo_bar_code: book.boo_bar_code,
                boo_edition: book.boo_edition,
                boo_pages: book.boo_pages,
                boo_publisher: book.boo_publisher,
                boo_synopsis: book.boo_synopsis,
                boo_weight: book.boo_weight,
                boo_width: book.boo_width,
                boo_depth: book.boo_depth,
                boo_height: book.boo_height,
                boo_price_acquisition: book.boo_price_acquisition,
                boo_justify_status: book.boo_justify_status as string,
                boo_category_change: book.boo_category_change as string,
                boo_status: book.boo_status as string,
                fk_boo_grp_id: book.boo_group_pricing.idEntity as string,
                fk_boo_aut_id: {
                    connect: book.boo_author.map((author) => {
                        return { aut_id: author.idEntity as string};
                    })
                },
                fk_boo_cte_id: {
                    connect: book.boo_categories.map((category) => {
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
        return await prisma.books.update({
            data: {...book},
            where: {
                boo_title: book.boo_title,
            }
        });
    }

    async find(book: Book): Promise<Object | null> {
        return await prisma.books.findFirst({
            where: {
                boo_title: book.boo_title,
            }
        });
    }

    async inactivate(book: Book): Promise<Object | null> {
        return await prisma.books.update({
            data: {
                boo_status: book.boo_status,
            },
            where: {
                boo_id: book.idEntity as string
            }
        });
    }
}
