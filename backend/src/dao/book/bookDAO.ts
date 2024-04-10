import BookDomain from '../../domain/Book'
import { prisma } from '../../prisma/prismaClient';
import AuthorDAO from '../author/AuthorDAO';
import CategoryDAO from '../category/CategoryDAO';
import { GroupPricingDAO } from '../groupPricing/groupPricingDAO';

class BookDAO {
    async createBook(bookData: BookDomain) {
        try {
            const {
                title,
                year,
                status,
                priceAcquisition,
                costProduction,
                categoryChange,
                justifyStatus,
                edition,
                ISBN,
                pages,
                synopsis,
                weight,
                width,
                height,
                depth,
                barCode,
                publisher,
                authors,
                categories,
                groupPricing,
                code
            } = bookData;
            //This Promise go return will IDs through methods statics in classes DAO
            const [authorIDs, categoriesIds, groupPricingId] = await Promise.all([
                AuthorDAO.getOrCreateAuthorID(authors),
                CategoryDAO.getOrCreateCategoriesId(categories),
                GroupPricingDAO.findGroupPricingId(groupPricing)
            ]);
            const createdBook = await prisma.book.create({
                data: {
                    boo_code: code,
                    boo_cost_product: costProduction,
                    boo_category_change: categoryChange,
                    boo_justify_status: justifyStatus,
                    boo_status: status,
                    boo_title: title,
                    boo_year: year,
                    boo_price_acquisition: priceAcquisition,
                    boo_edition: edition,
                    boo_ISBN: ISBN,
                    boo_pages: pages,
                    boo_synopsis: synopsis,
                    boo_width: width,
                    boo_height: height,
                    boo_weight: weight,
                    boo_depth: depth,
                    boo_bar_code: barCode,
                    fk_boo_pub_id: publisher,
                    fk_boo_grp_id: groupPricingId,
                    //Connect the Foreign Key at the authors IDs IN TABLE "BOOK_AUTHOR"
                    fk_boo_aut_id: {
                        connect: authorIDs.map((id) => {
                            return {
                                aut_id: id,
                            }
                        })
                    },
                    //Connect the Foreign Key at the categories IDs IN TABLE "BOOK_CATEGORIES"
                    fk_boo_cte_id: {
                        connect:categoriesIds.map((id) => {
                            return {
                                 cte_id: id
                            }
                        })
                    }
                },
                select: {
                    boo_code: true,
                    boo_cost_product: true,
                    boo_category_change: true,
                    boo_justify_status: true,
                    boo_status: true,
                    boo_title: true,
                    boo_year: true,
                    boo_price_acquisition: true,
                    boo_edition: true,
                    boo_ISBN: true,
                    boo_pages: true,
                    boo_synopsis: true,
                    boo_width: true,
                    boo_height: true,
                    boo_weight: true,
                    boo_depth: true,
                    boo_bar_code: true,
                    fk_boo_pub_id: true,
                    fk_boo_grp_id: true,
                },
            });
            return { createdBook }
        } catch (error) {
            throw new Error('Erro ao criar livro com autores e categorias');
        }
    }
    async findFirstBook(book: BookDomain) {
        return await prisma.book.findFirst({
            where: {
                boo_title: book.title,
            }
        })
    }

}

export { BookDAO };