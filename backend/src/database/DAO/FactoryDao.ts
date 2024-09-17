import { ClientDao } from "./ClientDao";
import { IDao } from "./IDao";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class FactoryDao {
    static createDao(name: string): IDao {
        switch (name) {
            case "CLIENT":
                return new ClientDao();
            default:
                throw new Error("Unknown DAO type");
        }
    }
}
