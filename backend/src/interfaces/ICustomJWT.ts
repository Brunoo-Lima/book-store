import jwt from 'jsonwebtoken'


export interface ICustomJwt extends jwt.JwtPayload {
    use_id: string,
    use_name: string
}
