export interface productItemType {
    brand: string | null,
    id: string,
    price: number,
    product: string
}

export interface filtersType {
    brand: string,
    price: number,
    product: string
}

export interface filtersObjType {
    brand?: string,
    price?: number,
    product?: string
}

export const startFilters: filtersType = {
    brand: '',
    price: 0,
    product: ''
}

export const FiltersSelect: filtersType = {
    brand: '',
    price: 0,
    product: ''
}

export const startProduct: productItemType = {
    brand: '',
    id: '',
    price: 0,
    product: 'string'
}