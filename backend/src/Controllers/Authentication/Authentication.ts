/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

export class Authentication {
    static generateToken(payload: any) {
        const secret = process.env.JWT_SECRET || 'your-secret-key';
        const options = { expiresIn: '1h' }; // Exemplo de expiração
        return jwt.sign(payload, secret, options);
    }
}
