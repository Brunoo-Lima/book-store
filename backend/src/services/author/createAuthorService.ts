import AuthorDAO from "../../dao/author/authorDAO";

interface AuthorData {
    name: string;
}

class CreateAuthorService {
    async execute({ name }: AuthorData) {
        const authorDAO = new AuthorDAO();

        const authorAlreadyExists = await authorDAO.findFirstAuthor({ name });

        if (authorAlreadyExists) throw new Error("Name already exists!");

        const author = await authorDAO.createAuthor({ name });

        return { author };
    }
}

export { CreateAuthorService };
