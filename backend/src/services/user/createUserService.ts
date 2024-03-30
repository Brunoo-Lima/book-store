import UserDAO from "../../dao/user/userDAO";

interface UserData {
    name: string;
}

class CreateUserService {
    async execute({ name }: UserData) {
        const userDAO = new UserDAO();

        const user = await userDAO.createUser({ name });

        if (!user.name || user.name === "")
            throw new Error("Name is required!");

        return { user };
    }
}

export { CreateUserService };
