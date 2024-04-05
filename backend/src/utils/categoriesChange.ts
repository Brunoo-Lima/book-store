export enum Inactivate {
    WITHOUT_STOCK = 'WITHOUT_STOCK'
}

export default {
    withoutStock: {
        status: false,
        justify: 'Product without stock',
        categoryChange: Inactivate.WITHOUT_STOCK
    }
}
