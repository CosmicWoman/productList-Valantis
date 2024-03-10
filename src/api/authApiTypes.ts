export interface ProductIdsType {
    offset?: number | string,
    limit?: number | string
}

export interface ProductItemsType {
    id: string,
    product: string,
    brand: string,
    price: number
}