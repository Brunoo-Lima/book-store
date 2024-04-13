import { describe, expect, it } from "vitest";
import LogsChange from "../domain/LogsChange";
import User from "../domain/User";
import { AuthorDomain } from "../domain/Author";
import { CategoryDomain } from "../domain/Category";
import BookDomain from "../domain/Book";


describe('Logs Change validate', () => {
    it('Should validate all the Logs', () => {

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
            ISBN: "978-85-65419-13-0",
            pages: 90,
            synopsis: "I don't",
            width: 90,
            height: 20,
            weight: 10,
            depth: 25
        })
        const user = new User('Danilo');
        const user2 = new User('Da');
        const user3 = new User('Da12');
        const user4 = new User('Danil');
        const logs = new LogsChange({
            change:
            {
                productAltered: book,
                user: user,
            }
        });
        logs.addLogChange({
            change: {
                productAltered: book,
                user: user3
            }
        })
        logs.addLogChange({
            change: {
                productAltered: book,
                user: user4
            }
        })
        for (const log of logs.allLogs) {
            console.log(log);
        }
    })
})
