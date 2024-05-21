import { describe, it, expect} from "vitest";
import Book from "../domain/Book";
import { AuthorDomain } from "../domain/Author";
import { CategoryDomain } from "../domain/Category";
import User from "../domain/User";
import Facade from "../domain/Facade/Facade";

describe("Book Domain", () => {
    it('Should created an entity of Book', () => {
        const user = new User('test');
        const facade = new Facade(user);
        facade.save(user);
    })
})
