/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserDao }  from '../database/DAO/UserDao';
import { User } from '@prisma/client';

export class TokenController {
    async store(req: Request, res: Response, next: NextFunction) {
        try {
            const userDao = new UserDao();
            const { username } = req.body;
            if (username) {
                return res.status(401).send({
                    error: ['Credentials invalid !'],
                });
            }
            const user = await userDao.find(username) as User;
            if (!user) {
                return res.status(401).send({
                    error: ["User was't found !"],
                });
            }
            const { use_id, use_name } = user

            const token = jwt.sign({ use_id, use_name },  process.env.TOKEN_SECRET as string);
            return res.json({ token, user: { name: use_name, use_id } });
        } catch (e) {
            return res.json({
                e
            });
        }
    }
}

