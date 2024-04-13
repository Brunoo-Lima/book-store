import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserDAO from '../dao/user/userDAO';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            errors: ['Login Required'],
        });
    }

    // Get the user
    const [bearer, token] = authorization.split(' ');
    try {
        const data = jwt.verify(token, "123jkw@$!$KRRWHLwhjasbjkfhiqu") as JwtPayload;

        // Verifying if the expected properties exist in the payload
        if (!data || !data.use_id || !data.use_name) throw new Error('Invalid token payload');

        const { use_id, use_name } = data;
        (req as CustomRequest).token = data; // Typing the data as CustomRequest

        const verifyUser = await UserDAO.findUser(use_name, use_id);
        if (!verifyUser) {
            return res.status(401).json({
                error: 'That user does not exist!',
            });
        }
        req.body.userId = use_id; // I created
        req.body.useName = use_name;
        return next();
    } catch (e) {
        return res.status(401).json({
            errors: ['Token expired or invalid'],
        });
    }
};
