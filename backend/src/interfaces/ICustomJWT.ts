import jwt from 'jsonwebtoken'


export interface ICustomJwt extends jwt.JwtPayload {
    clientEmail: string,
    clientPassword: string,
    user_id: string,
    user_email: string,
    user_password: string
}
