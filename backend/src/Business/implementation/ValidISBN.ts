import Book from "../../domain/Book";
import { IStrategy } from "../../interfaces/IStrategy";

export default class ISBN implements IStrategy{
    private messageError: string | undefined;

    public process(book: Book): void | string {

        if(book.boo_ISBN !== '' || this.validISBN(book)) return;
        this.messageError = 'ISBN is invalid !';

        return this.messageError;
    }

    private validISBN(book: Book) {
        const isbnFormatted = Array.from(this.removeCharacters(book));
        const isbValid = (isbnFormatted.length === 12)
            ? this.checkIsbnThirteenDigits(isbnFormatted)
            : this.checkIsbnTenDigits(isbnFormatted);
        return isbValid;
    }

    private checkIsbnThirteenDigits(isbn: string[]) {
        const checkDigitIs = Number(isbn.pop());
        let productSum = 0;

        for (let i = 0; i < isbn.length; i++) {

            let isbnNumbers = Number.parseInt(isbn[i]);
            let multiplier = i % 2 === 0 ? 1 : 3
            productSum += isbnNumbers * multiplier;

        }
        const digitChecked = this.checkDigit(productSum, checkDigitIs);
        return digitChecked;
    }

    private checkIsbnTenDigits(isbn: string[]) {
        let productSum = 0;
        let j = 10; //The multiplication should be from 10 to 2

        for (let i = 0; i < isbn.length; i++) {
            let isbnNumbers = Number.parseInt(isbn[i]);
            productSum += isbnNumbers * (j);
            j--;
        }
        return (productSum % 11 === 0);
    }

    private checkDigit(productSum: number, digit: number): boolean {
        const result = (productSum % 10);
        if (result === 0) return result === digit;
        return (10 - result) === digit;
    }

    private removeCharacters(book: Book) {
        const stringFormatted = book.boo_ISBN.replace(/[^\d]+/g, '').trim(); //  /[^\d]+/g === remove characters
        return stringFormatted;
    }

}
