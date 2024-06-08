import jwt from 'jsonwebtoken';

export interface CustomJwt extends jwt.JwtPayload {
    use_id: string,
    use_name: string
}
