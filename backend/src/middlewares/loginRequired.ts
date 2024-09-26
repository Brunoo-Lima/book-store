import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ICustomRequest } from '../interfaces/ICustomRequest';

export const authenticateJWT = (req: ICustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Espera que o token esteja no formato "Bearer <token>"

    if (!token) {
        return res.sendStatus(403); // Proibido se não houver token
    }

    const secret = process.env.TOKEN_SECRET as string;

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Proibido se o token for inválido
        }
        req.user = user; // Adiciona os dados do usuário à requisição
        next(); // Passa para a próxima middleware ou rota
    });
};
