import { ClientDao } from "./ClientDAO/ClientDao";
import { IDao } from "../../../interfaces/IDao";
import { UserDao } from "./UserDAO/UserDao";
import { SalesDao } from "./SalesDAO/SalesDao";
import { ProductDao } from "./ProductDAO/ProductDao";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class FactoryDao {
    static createDao(name: string): IDao {
        switch (name.toUpperCase()) {
            case "CLIENT":
                return new ClientDao();
            case "USER":
                return new UserDao()
            case "SALES":
                return new SalesDao()
            case "PRODUCT":
                return new ProductDao()
            default:
                throw new Error("Unknown DAO type");
        }
    }
}
