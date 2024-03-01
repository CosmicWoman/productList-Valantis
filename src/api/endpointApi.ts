import {authApi} from "./AuthApi";
import {FiltersType, ProductIdsType, ProductItemsType} from "./authApiTypes";

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
    })
})

export const getIds = endpointApi.endpoints.getIds.initiate
export const getFilters = endpointApi.endpoints.filter.initiate
export const getProduct = endpointApi.endpoints.getItems.initiate