import { BookDomain } from "../../domain/BookDomain";
import { prisma } from "../../prisma/prismaClient";

class BookDAO {
    async createBook(bookData: BookDomain) {
        return prisma.book.create({
            data: {
                ...bookData,
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
