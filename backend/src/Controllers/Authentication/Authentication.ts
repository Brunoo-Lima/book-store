/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

export class Authentication {
    static generateToken(payload: any) {
        const secret = process.env.TOKEN_SECRET as string;
        const options = { expiresIn: '30d' }; // Exemplo de expiração
        return jwt.sign(payload, secret, options);
    }
}
