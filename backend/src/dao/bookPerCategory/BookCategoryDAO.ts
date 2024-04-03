import { prisma } from "../../prisma/prismaClient";

export interface BookCategoryData {
    fk_bte_cte_id:string
    fk_bte_boo_code:string
}

class BookCategoryDAO {
    async createBookCategory (bookCategoryData: BookCategoryData){
        return prisma.book_Category.create({
            data: {...bookCategoryData},
            select: {
                fk_bte_cte_id:true,
                fk_bte_boo_code:true
            }
        })
    }
    async findManyBookCategory(bookCategoryData: BookCategoryData){
        return prisma.book_Category.findMany({
            where: {
                fk_bte_boo_code: bookCategoryData.fk_bte_boo_code,
            }
        })
    }
}

export default BookCategoryDAO
