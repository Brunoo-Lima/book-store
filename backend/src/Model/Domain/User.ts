import { EntityDomain } from "./EntityDomain";

export class User extends EntityDomain{
    constructor(
        private email: string,
        private password: string

    ){
        super()
    }
    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }
}
