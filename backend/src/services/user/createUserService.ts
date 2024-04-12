import UserDAO from "../../dao/user/userDAO";
import UserDomain from "../../domain/User";

class CreateUserService {
    async execute( name: string) {
        const userDAO = new UserDAO();
        const userDomain = new UserDomain(name);

        const user = await userDAO.createUser(userDomain);

        if (!user.use_name || user.use_name === "")
            throw new Error("Name is required!");

        return user;
    }
}

export { CreateUserService };
