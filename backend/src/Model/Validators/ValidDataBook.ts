import { IStrategy } from "../../interfaces/IStrategy";
import { Book } from "../entities/Book/Book";

export class ValidDataBook implements IStrategy {
    process(book: Book): object {
        if (!book) {
            return { error: "The book object is required." };
        }

        const errors: string[] = [];

        // Validação de campos principais
        if (!book.id) errors.push("The field '_id' is required.");
        if (!book.createdAt) errors.push("The field 'created_at' is required.");
        if (!book.updatedAt) errors.push("The field 'updated_at' is required.");
        if (!book.price || book.price <= 0) errors.push("The field '_price' must be a positive number.");
        if (!Number.isInteger(book.quantity) || book.quantity <= 0) errors.push("The field '_quantity' must be an integer greater than zero.");

        // Validação do objeto bookProps
        if (!book) {
            errors.push("The field 'bookProps' is required.");
        } else {

            const { title, year, edition, ISBN, pageNumber, synopses, dimensions, authors, categories, publisher, pricingGroup, codeBar } = book;
 
            if (!title || title.trim() === "") errors.push("The field 'title' is required.");
            if (!year || isNaN(Number(year))) errors.push("The field 'year' must be a valid number.");
            if (!edition || edition.trim() === "") errors.push("The field 'edition' is required.");
            if (!ISBN || ISBN.length < 10 || ISBN.length > 13 || isNaN(Number(ISBN))) errors.push("The field 'ISBN' must be a valid 10 or 13-digit number.");
            if (!pageNumber || pageNumber <= 0) errors.push("The field 'pageNumber' must be a positive number.");
            if (!synopses || synopses.trim() === "") errors.push("The field 'synopses' is required.");

            // Validação das dimensões do livro
            if (!dimensions || dimensions.height <= 0 || dimensions.width <= 0 || dimensions.depth <= 0 || dimensions.weight <= 0) {
                errors.push("The 'dimensions' fields must have positive values.");
            }

            // Validação dos autores
            if (!authors || !Array.isArray(authors) || authors.length === 0) {
                errors.push("At least one author is required.");
            } else {
                authors.forEach((author, index) => {
                    if (!author || !author.name || author.name.trim() === "") {
                        errors.push(`The 'name' field for author at index ${index} is required.`);
                    }
                });
            }

            // Validação das categorias
            if (!categories || !Array.isArray(categories) || categories.length === 0) {
                errors.push("At least one category is required.");
            } else {
                categories.forEach((category, index) => {
                    if (!category || !category.name || category.name.trim() === "") {
                        errors.push(`The 'name' field for category at index ${index} is required.`);
                    }
                });
            }

            // Validação do publisher
            if (!publisher || !Array.isArray(publisher) || publisher.length === 0) {
                errors.push("At least one publisher is required.");
            } else {
                publisher.forEach((pub, index) => {
                    if (!pub || !pub.name || pub.name.trim() === "") {
                        errors.push(`The 'name' field for publisher at index ${index} is required.`);
                    }
                });
            }

            // Validação do pricingGroup
            if (!pricingGroup || !pricingGroup.type) {
                errors.push("The field 'pricingGroup.pricingProps.type' is required.");
            } else {
                const validPricingTypes = ["BRONZE", "SILVER", "GOLD", "PLATINUM"];
                if (!validPricingTypes.includes(pricingGroup.type)) {
                    errors.push(`The field 'pricingGroup.pricingProps.type' must be one of: ${validPricingTypes.join(", ")}`);
                }
            }

            // Validação do código de barras
            if (!codeBar || codeBar.length < 8 || codeBar.length > 20 || isNaN(Number(codeBar))) {
                errors.push("The field 'codeBar' must be a valid numeric string between 8 and 20 characters.");
            }
        }

        // Retornar os erros encontrados ou sucesso
        return errors.length > 0 ? { error: errors[0] } : { success: "All required data is valid." };
    }
}
