// FactoryDao.ts
import { IDao } from "../interfaces/IDao";
import UserDao from "./UserDao";
import BookDao from "./BookDao";

export abstract class FactoryDao {
    static createDao(name: string): IDao {
        switch (name.toUpperCase()) {
            case "USER":
                return new UserDao();
            case "BOOK":
                return new BookDao();
            default:
                throw new Error("Unknown DAO type");
        }
    }
}
