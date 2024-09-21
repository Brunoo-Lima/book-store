import jwt from 'jsonwebtoken'


export interface ICustomJwt extends jwt.JwtPayload {
    email: string,
    password: string
}
