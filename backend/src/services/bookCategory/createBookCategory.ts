import BookCategoryDAO, { BookCategoryData } from "../../dao/bookPerCategory/BookCategoryDAO";

class BookCategoryService {
    async execute(bookCategory: BookCategoryData){
        const bookCategoryDao = new BookCategoryDAO();
        const bookPerCategory = await bookCategoryDao.createBookCategory(bookCategory);

        return { bookPerCategory }
    }
}
