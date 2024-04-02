import UserDAO from "../../dao/user/userDAO";

interface UserData {
    use_name: string;
}

class CreateUserService {
    async execute({ use_name }: UserData) {
        const userDAO = new UserDAO();

        const user = await userDAO.createUser({ use_name });

        if (!user.use_name || user.use_name === "")
            throw new Error("Name is required!");

        return { user };
    }
}

export { CreateUserService };
