import Book from "../domain/Book";
import EntityDomain from "../domain/EntityDomain";
import { IDao } from "../interfaces/IDao";
import { prisma } from "../prisma/prismaClient";

export default class BookDao implements IDao{
    async create(book: Book): Promise<Object | null> {
        return await prisma.book.create({
            data: {
                boo_id: book.idEntity,
                boo_title: book.title,
                boo_synopsis: book.synopsis,
                boo_year: book.year,
                boo_bar_code: book.barCode,
                boo_category_change: book.categoryChange,
                boo_code: book.code,
                boo_cost_product: 0,
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
                boo_status: book.status,
                fk_boo_grp_id: book.groupPricing.idEntity,
                created_at: book.dateCreate,
                updated_at: book.updateAt,
            }
        });
    }
    update(entity: EntityDomain): Promise<Object | null> {
        throw new Error("Method not implemented.");
    }
    findUnique(entity: EntityDomain): Promise<Object | null> {
        return prisma.book.findMany({
            where: {
                ...entity
            }
        })
    }
    async inactivate(book: Book): Promise<Object | null> {
        return await prisma.book.update({
            data: {
                boo_status: book.status,
            },
            where: {
                boo_id: book.idEntity
            }
        })
    }
}
