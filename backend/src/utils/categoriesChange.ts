export enum Inactivate {
    WITHOUT_STOCK = 'WITHOUT_STOCK'
}

export default {
    withoutStock: {
        justify: 'Product without stock',
        categoryChange: Inactivate.WITHOUT_STOCK
    }
}
