import { describe, expect, it } from "vitest";
import ISBN from "../domain/Validations/ISBN";

describe('ISBN validate', () => {
    it('Should validate all the ISBN', () => {
        const isbn = new ISBN('978-85-345-2931-0');
        expect(isbn.validISBN()).equal(true);
    })
})
