import AuthorDAO from "../../dao/author/authorDAO";

interface AuthorData {
    aut_name: string;
}

class CreateAuthorService {
    async execute({ aut_name }: AuthorData) {
        const authorDAO = new AuthorDAO();

        const authorAlreadyExists = await authorDAO.findFirstAuthor({ aut_name });

        if (authorAlreadyExists) throw new Error("Name already exists!");

        const author = await authorDAO.createAuthor({ aut_name });

        return { author };
    }
}

export { CreateAuthorService };
