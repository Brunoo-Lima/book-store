export enum Inactivate {
    WITHOUT_STOCK = 'WITHOUT_STOCK'
}
export enum Status {
    ACTIVATE ='ACTIVATE',
    INACTIVATE = 'INACTIVATE'
}

export default {
    withoutStock: {
        status: Status.INACTIVATE,
        justify: 'Product without stock',
        categoryChange: Inactivate.WITHOUT_STOCK
    }
}
