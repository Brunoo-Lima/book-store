import { expect, it } from "vitest";
import { CPF } from "../Model/domain/CPF";
// import { ValidCPF } from "../Model/Business/ValidCPF";
// import { ValidDataClient } from "../Model/Business/ValidDataClient";

const cpf = new CPF('53302901801')

it("Should create domain entity", async () => {
    const cpfReplaced = cpf.code.replace('.', "").replace("-", "")
    let sum = 0
    let digit1 = 0
    let digit2 = 0
    let cpfIsValid = false

    for(let i = 1; i <= cpfReplaced.length; i++){
        sum += Number(cpfReplaced[i-1]) * i

        if(i == cpfReplaced.length) {
            digit1 = (sum % 11 == 10) ? 0 : sum % 11
            sum = 0
        }
    }
    for(let i = 0; i < cpfReplaced.length; i++){
        sum += (i !== 10) ? Number(cpfReplaced[i]) * i : Number(cpfReplaced[i]) * 0
    }
    digit2 = (sum % 11 == 10) ? 0 : sum % 11
    const digits =`${digit1}${digit2}`

    if(cpfReplaced.slice(cpfReplaced.length-2, cpfReplaced.length) === digits) cpfIsValid = true

    expect(cpfIsValid).equals(true)
})
