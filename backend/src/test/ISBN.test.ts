import { describe, expect, it } from "vitest";
import ISBN from "../domain/Validations/ISBN";

describe('ISBN validate', () => {
    it('Should validate all the ISBN', () => {
        const isbn = new ISBN('0136091814');
        expect(isbn.validISBN()).equal(true);
    })
})
