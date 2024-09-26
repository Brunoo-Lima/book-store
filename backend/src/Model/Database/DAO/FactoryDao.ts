import { ClientDao } from "./ClientDAO/ClientDao";
import { IDao } from "../../../interfaces/IDao";
import { UserDao } from "./UserDAO/UserDao";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class FactoryDao {
    static createDao(name: string): IDao {
        switch (name.toUpperCase()) {
            case "CLIENT":
                return new ClientDao();
            case "USER":
                return new UserDao()
            default:
                throw new Error("Unknown DAO type");
        }
    }
}
