export interface bookDTO {
    title: string,
    year: number,
    isbn: string,
    edition: string,
    pages: number,
    synopses: string,
    codeBar: string,
    price: number,
    quantity: number,
    dimensions: {
        height: number,
        width: number,
        weight: number,
        depth: number
    },
    authors: Array<{
        name: string
    }>,
    categories: Array<{
        name: string
    }>,
    publisher: Array<
    {
        name: string
    }>
}
