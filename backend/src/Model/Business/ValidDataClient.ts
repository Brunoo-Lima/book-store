import { IStrategy } from "../../interfaces/IStrategy";
import { Client } from "../domain/Client";

export class ValidDataClient implements IStrategy{
    process(client: Client): object {
        for(const [, value] of Object.entries(client)){
            if (value instanceof Array){
                value.map((v) => {
                    if(v === "" || v < 0){
                        return {
                            error: "Values required not send !"
                        }
                    }
                })
            }
            if(value === "" || value < 0){ // Tipo NULL dentro dos enums é -1 (por isso da verificação) os atributos do objeto podem ser uma string vazia
                return {
                    error: "Values required not send !"
                }
            }
        }
        return {
            success: "Entity is valid !"
        }
    }
}
