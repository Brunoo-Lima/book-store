import { IStrategy } from "../../interfaces/IStrategy";
import { Client } from "../domain/Client";
import { Flags } from "../domain/types/Flags";

export class ValidCreditCard implements IStrategy{
    process(client: Client): object {
        if(client.creditCard){
            for(const card of client.creditCard){
                if(card.flag in Flags) continue;
                return {
                    error: "Credit Card Flag is invalid. The Flags accepts is: Elo, Mastercard, Visa."
                }
            }
        }
        return {
            success: 'Credit Card is Valid'
        }
    }
}
