import jwt from 'jsonwebtoken'


export interface ICustomJwt extends jwt.JwtPayload {
    clientEmail: string,
    clientPassword: string
}
