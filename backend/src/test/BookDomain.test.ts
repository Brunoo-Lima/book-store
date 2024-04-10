import {it, describe, expect} from 'vitest';
import Book from '../domain/Book';
import Author from '../domain/Author';
import Publisher from '../domain/Publisher';
import {TypePricing } from '../utils/groupOfPricing';
import Dimensions from '../domain/Dimensions';
import Category from '../domain/Category';

describe('Domain Book', () => {
    it('Should create object Book', () => {
        const author = new Author('Author 1')
        const publisher = new Publisher('publisher')
        const categories = new Category([
            'ROMANCE',
            'HORROR'
        ]);
        const dimensions = new Dimensions({
            width: 9.0,
            height: 4.0,
            weight: 5.1,
            depth: 9.2
        })
        const book = new Book({
            code: '123',
            codeBar: '4567',
            status: 'ACTIVATE',
            priceAcquisition: 500,
            costProduct: 250,    //Include expense
            quantity: -10,
            created_at: Date.now(),
            updated_at: Date.now(),
            author: author,
            year: 2024,
            categories: categories,
            title: 'I do not',
            publisher: publisher,
            edition: 'Deluxe',
            ISBN: '12312421412',
            pages: 90,
            synopsis: 'You do not',
            dimensions: dimensions
        });
        console.log(book.bookToJson())
        expect(book.allBookProps.groupPricing!.typeGroupPricing).equal(TypePricing.SILVER);
        expect(book.allBookProps.status).equal("ACTIVATE");
    })
})