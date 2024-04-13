import UserDAO from "../../dao/user/userDAO";
import UserDomain from "../../domain/User";

export default class CreateUserService {
    async execute( name: string) {
        const userDAO = new UserDAO();
        const userDomain = new UserDomain(name);
        if(name.length === 0) throw new Error('The name cannot be empty !');

        const user = await userDAO.createUser(userDomain);
        return user;
    }
}


