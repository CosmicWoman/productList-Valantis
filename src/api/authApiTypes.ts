export type authApiType<T= {}> = {
    'action': actionType,
    'params': T
}

type actionType = 'filter' |  "get_ids" | "get_items" | "get_fields"


export interface ProductIdsType {
    offset: number,
    limit: number
}

export interface ProductItemsType {
    id: string,
    product: string,
    brand: string,
    price: number
}

export interface FiltersType {
    filterOfName?: string,
    filterOfBrand?: string,
    filterOfPrice?: number,
}

export interface fieldsType {
    field: string,
    offset: number,
    limit: number,
}
