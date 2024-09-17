/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { ClientDao } from '../database/DAO/ClientDao';
import { Client } from '@prisma/client';
import { ClientFactory } from '../domain/Client';

export class TokenController {
    async store(req: Request, res: Response, next: NextFunction) {
        try {
            const clientDao = new ClientDao();
            const { email, password } = req.body;

            if (email || password) {
                return res.status(401).send({
                    error: ['Credentials invalid !'],
                });
            }
            const client = ClientFactory.createClient(email, password)
            const clientExist = await clientDao.find(client)
            if (!clientExist) {
                return res.status(401).send({
                    error: ["User was't found !"],
                });
            }
            const { cli_email, cli_password } = clientExist as Client

            const token = jwt.sign({ cli_email, cli_password }, process.env.TOKEN_SECRET as string);
            return res.json({token});
        } catch (e) {
            return res.json({
                e
            });
        }
    }
}

