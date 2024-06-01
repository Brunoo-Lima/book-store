// import EntityDomain from "../domain/EntityDomain";
// import { ErrorValidationsException } from "../domain/Errors/ErrorValidationsException";
// import { IStrategy } from "../interfaces/IStrategy";

// export class ValidDomain implements IStrategy {
//     process(entity: EntityDomain): void {
//         this.notNull(entity, 'Data cannot be null !');
//         this.notNegative(entity)
//     }
//     public notNull(value: EntityDomain, messageException: string): void {
//         if(!value){
//             throw new ErrorValidationsException(messageException);
//         }
//     }
//     public notNegative(value: number, messageException: string): void{
//         if(value < 0) {
//             throw new ErrorValidationsException(messageException);
//         }
//     }
//     public dateNotAfterDate(value: Date, messageException: string): void {
//         const today = new Date();
//         if(today.getTime() < value.getTime()){
//             throw new ErrorValidationsException(messageException);
//         }
//     }
// }
