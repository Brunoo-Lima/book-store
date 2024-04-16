import AuthorDAO from "../../dao/author/AuthorDAO";
import { BookDAO } from "../../dao/book/bookDAO";
import CategoryDAO from "../../dao/category/CategoryDAO";
import { AuthorDomain } from "../../domain/Author";
import { CategoryDomain } from "../../domain/Category";
import { BookDTO } from "../../types/types";
import ValidObjectBook from "../../utils/ValidObjects";

export default class ShowBookService {
    async execute(dataQuery: BookDTO){
        if(!dataQuery) throw new Error('You should send the data to query !');
    }
}
