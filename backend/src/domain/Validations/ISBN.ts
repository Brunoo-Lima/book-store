export default class ISBN {
    constructor(private value: string) {}

    public validISBN() {
        const isbnFormatted = Array.from(this.removeCharacters());
       (isbnFormatted.length !== 12)
       ? this.checkIsbnThirteenDigits(isbnFormatted)
       :this.checkIsbnTenDigits(isbnFormatted);

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
        if (!digitChecked) throw new Error('ISBN-13 is invalid !')
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

    private removeCharacters() {
        const stringFormatted = this.value.replace(/[^\d]+/g, '').trim(); //  /[^\d]+/g === remove characters
        return stringFormatted;
    }

}
