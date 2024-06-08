import { describe, it, expect } from "vitest";
import Book, { BookProps } from "../domain/Book";
import { Author } from "../domain/Author";
import { Category } from "../domain/Category";
import Facade from "../domain/Facade/Facade";
import ISBN from "../Business/ValidISBN";
import ErrorEntityException from "../domain/Errors/ErrorEntityException";
import { ErrorValidationsException } from "../domain/Errors/ErrorValidationsException";
import { GroupPricing } from "../domain/GroupPricing";
import { ValidRequiredData } from "../Business/ValidRequiredBookData";


const dataTestBook = new Book({
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
    groupPricing: new GroupPricing("GOLD", 0.20)
});


describe("Book Domain", () => {
    it('Should valid required data', () => {
        const author = new Author('test');
        console.log(author.dateCreate);
    })
})


