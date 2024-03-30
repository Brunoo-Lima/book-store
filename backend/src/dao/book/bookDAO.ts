import { prisma } from "../../prisma/prismaClient";

export interface BookData {
    title: string;
    year: number;
    edition: string;
    ISBN: string;
    pages: number;
    synopsis: string;
    width: number;
    height: number;
    weight: number;
    depth: number;
    author: string;
    publisher: string;
}

class BookDAO {
    async createBook(bookData: BookData) {
        return prisma.book.create({
            data: {
                title: bookData.title,
                year: bookData.year,
                edition: bookData.edition,
                ISBN: bookData.ISBN,
                pages: bookData.pages,
                synopsis: bookData.synopsis,
                width: bookData.width,
                height: bookData.height,
                weight: bookData.weight,
                depth: bookData.depth,
                author: bookData.author,
                publisher: bookData.publisher,
            },
            select: {
                title: true,
                year: true,
                edition: true,
                ISBN: true,
                pages: true,
                synopsis: true,
                width: true,
                height: true,
                weight: true,
                depth: true,
                author: true,
                publisher: true,
            },
        });
    }

    async findFirstBook(bookData: BookData) {
        return prisma.book.findFirst({
            where: {
                title: bookData.title,
            },
        });
    }

    async getListBook() {
        return prisma.book.findMany();
    }
}

export default BookDAO;
