import { describe, it, expect } from "vitest";
import Book, { BookProps } from "../domain/Book";
import { Author } from "../domain/Author";
import { Category } from "../domain/Category";
import Facade from "../domain/Facade/Facade";
import ISBN from "../Validations/ISBN";
import ErrorEntityException from "../domain/Errors/ErrorEntityException";
import { ErrorValidationsException } from "../domain/Errors/ErrorValidationsException";


const dataTestBook: BookProps = {
    status: "ACTIVATE" ,
    justifyStatus: 'Activate to test...',
    categoryOfChange: 'Testing',
    codeBar: '123456789',
    priceAcquisition: 10.90,
    costProduct: 5.00,
    quantity: -10,
    code: '123456',
    authors: [
        new Author('Name test'),
    ],
    year: 2024,
    categories: [
        new Category('Category test'),
    ],
    title: "It's a test",
    publisher: 'pub',
    edition: 'Deluxe',
    ISBN: '',
    pages: 90,
    synopsis: 'Just testing',
    width: 2.1,
    height: 3.5,
    weight: 1.2,
    depth: 1,
    groupPricing: {
        type: 'Gold',
        percent: 0.25 //This'll be a float number
    }
}


describe("Book Domain", () => {
    it('Should raise an exception', () => {
        try{
            const book = new Book(dataTestBook);
            const isbnValidated = new ISBN();
            isbnValidated.process(book);
        } catch (e) {
            expect(e).toBeInstanceOf(ErrorValidationsException);
        }
    })
})


