import { ErrorValidationsException } from "../Errors/ErrorValidationsException";

export class DomainValidate {
    public notNull(value: object, messageException: string): void {
        if(!value){
            throw new ErrorValidationsException(messageException);
        }
    }
    public notNegative(value: number, messageException: string): void{
        if(value < 0) {
            throw new ErrorValidationsException(messageException);
        }
    }
    public dateNotAfterDate(value: Date, messageException: string): void {
        const today = new Date();
        if(today.getTime() < value.getTime()){
            throw new ErrorValidationsException(messageException);
        }
    }
}
