import { it, describe, expect } from 'vitest';
import BookDomain from '../domain/Book';
import { AuthorDomain } from '../domain/Author';
import { TypePricing } from '../domain/GroupPricing';
import { CategoryDomain } from '../domain/Category';

describe('Domain Book', () => {
    it('Should create object Book', () => {
        const authors = [
            new AuthorDomain({
                name: 'test1'
            }),
            new AuthorDomain({
                name: 'test2'
            }),
            new AuthorDomain({
                name: 'test3'
            })
        ]
        const categories = [
            new CategoryDomain(
                'ROMANCE',
            ),
            new CategoryDomain(
                'HORROR',
            ),
        ]
        const book = BookDomain.createBook({
            code: "12342",
            status: "ACTIVATE",
            justifyStatus: "Test",
            categoryOfChange: "IN STOCK",
            codeBar: "1234",
            priceAcquisition: 500,
            costProduct: 250,
            quantity: -10,
            authors,
            year: 2024,
            categories,
            title: "Testing...",
            publisher: "editora",
            edition: "deluxe",
            ISBN: "1234215",
            pages: 90,
            synopsis: "I don't",
            width: 90,
            height: 20,
            weight: 10,
            depth: 25
        })
        expect(book.groupPricingIs.typePricingIs).equal(TypePricing.GOLD);
    })
})
