import {authApi} from "./AuthApi";
import {fieldsType, FiltersType, ProductIdsType, ProductItemsType} from "./authApiTypes";

const endpointApi = authApi.injectEndpoints({
    endpoints: (build) => ({
        getIds: build.mutation<string[], ProductIdsType>({
            query: ({limit, offset}) => ({
                url: `/`,
                method: 'POST',
                body: {
                    action: 'get_ids',
                    params: {offset, limit}
                }
            })
        }),
        getItems: build.mutation<ProductItemsType[], string[]>({
            query: (product) => ({
                url: `/`,
                method: 'POST',
                body: {
                    action: 'get_items',
                    params: {
                        ids: product
                    }
                }
            })
        }),
        filter: build.mutation<string[], FiltersType>({
            query: (filters) => ({
                url: `/`,
                method: 'POST',
                body: {
                    action: 'filter',
                    params: {
                        price: Number(filters.filterOfPrice),
                        product: filters.filterOfName,
                        brand: filters.filterOfBrand
                    }
                }
            })
        }),
        getFields: build.mutation<string[], fieldsType>({
            query: ({field,offset,limit}) => ({
                url: `/`,
                method: 'POST',
                body: {
                    action: 'get_fields',
                    params: {field,offset,limit}
                }
            })
        }),
    })
})

export const getIds = endpointApi.endpoints.getIds.initiate
export const getFilters = endpointApi.endpoints.filter.initiate
export const getProduct = endpointApi.endpoints.getItems.initiate
export const getFields = endpointApi.endpoints.getFields.initiate