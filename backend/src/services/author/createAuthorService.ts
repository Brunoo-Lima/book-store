import AuthorDAO from "../../dao/author/AuthorDAO";
import AuthorDomain from "../../domain/Author";

class CreateAuthorService {
    async execute(name: string) {
        const authorDao = new AuthorDAO();
        const authorDomain = new AuthorDomain(name);
        const authorAlreadyExist = await authorDao.findFirstAuthor(authorDomain);

        if (authorAlreadyExist) throw new Error(`Author already exists`);

        const createAuthor = await authorDao.createAuthor(authorDomain);

        return { createAuthor };
    }
}

export { CreateAuthorService };
