/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ICustomRequest } from '../interfaces/ICustomRequest';
import { ICustomJwt } from '../interfaces/ICustomJWT';


export const login = (req: ICustomRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            errors: ['Login Required'],
        });
    }
    // Get the user
    const [, token] = authorization.split(' ');
    try {
        const secret = process.env.TOKEN_SECRET as string;
        const user = jwt.verify(token, secret) as ICustomJwt;

        // Verifying if the expected properties exist in the payload
        if (!user || !user.user_email || !user.user_password) return {
            error: 'Invalid token payload'
        }

        if (!user) {
            return res.status(401).json({
                error: 'That user does not exist!',
            });
        }

        req.body.user = user; // I created

        return next();
    } catch (e) {
        return res.status(401).json({
            errors: `Token expired or invalid. Error: ${e}`,
        });
    }
}
