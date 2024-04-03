import { prisma } from "../../prisma/prismaClient";

export interface BookData {
    boo_code: string;
    boo_title: string;
    boo_author: string;
    boo_publisher:string;
    boo_year: number;
    boo_status: string;
    boo_justify_status: string;
    boo_category_change: string;
    boo_bar_code: string;
    boo_price_acquisition: number;
    boo_edition: string;
    boo_ISBN: string;
    boo_pages: number;
    boo_synopsis: string;
    boo_width: number;
    boo_height: number;
    boo_weight: number;
    boo_depth: number;
    fk_boo_grp_id:string;
}


class BookDAO {
    async createBook(bookData: BookData) {
        return prisma.book.create({
            data: {...bookData},
            select: {
                boo_title: true,
                boo_author: true,
                boo_publisher:true,
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
                fk_boo_grp_id:true,
            },
        });
    }

    async findFirstBook(bookData: BookData) {
        return prisma.book.findFirst({
            where: { boo_title: bookData.boo_title},
        });
    }

    async getListBook() {
        return prisma.book.findMany();
    }
}

export default BookDAO;
