// import { IStrategy } from "../../interfaces/IStrategy";
// import { Client } from "../domain/Client";

// export class ValidCPF implements IStrategy {
//     async process(client: Client){
//         const cpfReplaced = client.cpf.code.replace('.', "").replace("-", "").trim()
//         let sum = 0
//         let digit1 = 0
//         let digit2 = 0
//         let cpfIsValid = false
//         if(cpfReplaced.length !== 11){
//             return {
//                 error: 'CPF length is invalid !'
//             }
//         }
//         for(let i = 1; i < cpfReplaced.length - 1; i++){
//             sum += Number(cpfReplaced[i - 1]) * i
//         }
//         digit1 = (sum % 11 == 10) ? 0 : sum % 11
//         sum = 0

//         for(let i = 1; i < cpfReplaced.length; i++){
//             sum += (i !== 10) ? Number(cpfReplaced[i]) * i : Number(cpfReplaced[i]) * 0
//         }
//         digit2 = (sum % 11 == 10) ? 0 : sum % 11
//         const digits =`${digit1}${digit2}`

//         if(cpfReplaced.slice(cpfReplaced.length-2, cpfReplaced.length) === digits) cpfIsValid = true
//         if(!cpfIsValid){
//             return {
//                 error: 'CPF is invalid !'
//             }
//         }
//         return {
//             success: "Your CPF is valid !"
//         }
//     }
// }
