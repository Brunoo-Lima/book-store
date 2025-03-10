import { IStrategy } from "../../interfaces/IStrategy";
import { Client } from "../entities/Client/Client";
import { EntityDomain } from "../entities/EntityDomain";
import { User } from "../entities/User";
import { hashSync } from "bcrypt";
export class ValidPassword implements IStrategy {
    //Atualizar está permitindo senhas inválidas
    process(entity: EntityDomain): object {
        if (entity instanceof Client) {
            if (
                entity.password !== entity.confirmPassword ||
                !this.validCharactersPassword(entity.password)
            )
                return {
                    error: "Passwords isn't valid ! Verify if the password contains characters: A-Z, a-z, 0-9, special character, length > 8 or if passwords is equals",
                };
            entity.password = hashSync(entity.password, 2);
            entity.confirmPassword = entity.password;
        }
        if (entity instanceof User) {
            const user = entity as User;
            if (
                user.getPassword() !== user.getConfirmPassword() ||
                !this.validCharactersPassword(entity.getPassword())
            ) {
                return {
                    error: "Passwords isn't valid ! Verify if the password contains characters: A-Z, a-z, 0-9, special character, length > 8 or if passwords is equals",
                };
            }
            user.setPassword(hashSync(user.getPassword(), 2));
            user.setConfirmPassword(user.getPassword());
        }
        return {
            success: "Password is valid !",
        };
    }

    private validCharactersPassword(password: string): boolean {
        const regexLetters = /[A-Za-z]+/;
        const regexNumber = /[0-9]+/;
        const regexCharacters = /\W+/;

        return (
            regexLetters.test(password) &&
            regexNumber.test(password) &&
            regexCharacters.test(password)
        );
    }
}
