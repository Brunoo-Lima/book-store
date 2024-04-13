import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserDAO from '../../dao/user/userDAO';

class TokenController {
    async store(req: Request, res: Response) {
        try {
            const userDao = new UserDAO();
            const { username } = req.body;
            if (username) {
                return res.status(401).json({
                    error: ['Credentials invalid !'],
                });
            }
            const user = await userDao.findUserByName(username);
            if (!user) {
                return res.status(401).json({
                    error: ["User was't found !"],
                });
            }
            const { use_id, use_name } = user;

            const token = jwt.sign({ use_id, use_name }, "123jkw@$!$KRRWHLwhjasbjkfhiqu");
            return res.json({ token, user: { name: user.use_name, use_id } });
        } catch (e) {
            return res.json({
                e
            });
        }
    }
}
export default new TokenController();
