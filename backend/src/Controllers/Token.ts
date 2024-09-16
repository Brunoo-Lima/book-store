/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ClientDao } from '../database/DAO/ClientDao';
import { Client } from '@prisma/client';

export class TokenController {
    async store(req: Request, res: Response, next: NextFunction) {
        try {
            const clientDao = new ClientDao();
            const { email, password } = req.body;

            if (email  || password) {
                return res.status(401).send({
                    error: ['Credentials invalid !'],
                });
            }
            const clientExist = await clientDao.find()
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

