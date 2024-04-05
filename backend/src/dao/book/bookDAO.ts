import BookDomain from "../../domain/Book";
import { prisma } from "../../prisma/prismaClient";

class BookDAO {
    async createBook(bookData: BookDomain) {
        return prisma.book.create({
            data: {
                boo_code: bookData.allBookProps.code,
                boo_title: bookData.allBookProps.title,
                boo_author: bookData.allBookProps.author.name,
                boo_publisher: bookData.allBookProps.publisher.name,
                boo_year: bookData.allBookProps.year,
                boo_status: bookData.allBookProps.status as string,
                boo_justify_status: bookData.allBookProps.justifyStatus as string,
                boo_category_change: bookData.allBookProps.categoryOfChange as string,
                boo_bar_code: bookData.allBookProps.codeBar,
                boo_price_acquisition: bookData.allBookProps.priceAcquisition,
                boo_edition: bookData.allBookProps.edition,
                boo_ISBN: bookData.allBookProps.ISBN,
                boo_pages: bookData.allBookProps.pages,
                boo_synopsis: bookData.allBookProps.synopsis,
                boo_width: bookData.allBookProps.dimensions.width,
                boo_height: bookData.allBookProps.dimensions.height,
                boo_weight: bookData.allBookProps.dimensions.weight,
                boo_depth: bookData.allBookProps.dimensions.depth,
                boo_grp_id: '234'
                // fk_boo_grp_id: bookData.allBookProps.groupPricing?.typeGroupPricing, //ERROR
            },
            select: {
                boo_code: true,
                boo_title: true,
                boo_author: true,
                boo_publisher: true,
                boo_year: true,
                boo_status: true,
                boo_justify_status: true,
                boo_category_change: true,
                boo_bar_code: true,
                boo_price_acquisition: true,
                boo_edition: true,
                boo_ISBN: true,
                boo_pages: true,
                boo_synopsis: true,
                boo_width: true,
                boo_height: true,
                boo_weight: true,
                boo_depth: true,
                fk_boo_grp_id: true,
            },
        });
    }

    async findFirstBook(bookData: BookDomain) {
        return prisma.book.findFirst({
            where: { boo_title: bookData.boo_title },
        });
    }

    async getListBook() {
        return prisma.book.findMany();
    }
}

export default BookDAO;
