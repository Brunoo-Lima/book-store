// FactoryDao.ts
import { IDao } from "../interfaces/IDao";
import UserDao from "./UserDao";
import BookDao from "./BookDao";
import { GroupPricingDao } from "./GroupPricingDao";
import { CategoryDao } from "./CategoryDao";
import { AuthorDao } from "./AuthorDao";
import { LogChangeDao } from "./LogChangeDao";

export abstract class FactoryDao {
    static createDao(name: string): IDao {
        switch (name.toUpperCase().trim()) {
            case "USER":
                return new UserDao();
            case "BOOK":
                return new BookDao();
            case "GROUPPRICING":
                return new GroupPricingDao();
            case "CATEGORY":
                return new CategoryDao();
            case "AUTHOR":
                return new AuthorDao();
            case "LOGCHANGE":
                return new LogChangeDao();
            default:
                throw new Error("Unknown DAO type");
        }
    }
}
