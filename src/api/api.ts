import axios, {AxiosError} from "axios";
import axiosRetry from "axios-retry";
import md5 from "md5";
import {ProductIdsType, ProductItemsType} from "./authApiTypes";
import {filtersObjType} from "../types/types";

export const startUrl = "https://api.valantis.store:41000/"
export const password = 'Valantis'
const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
export const xAuth = md5(password + '_' + stamp)
const attempts = 20

axiosRetry(axios, {
    retries: attempts,
    shouldResetTimeout: true,
});

const headers = {
    'X-Auth': xAuth,
    'Content-Type': 'application/json',
};

export const getIds = async (params: ProductIdsType): Promise<string[]> => {
    try {
        const response = await axios.post(startUrl, {
            action: "get_ids",
            params: params,
        }, {headers})
            .then(response => {
                return response.data.result
            })
            .catch((e: AxiosError) => {
                console.log(e.message)
                return e.message
            })
        return response;
    } catch (error) {
        throw error;
    }
};


export const getItems = async (ids: string[]): Promise<ProductItemsType[]> => {
    try {
        const response = await axios.post(startUrl, {
            action: "get_items",
            params: {ids},
        }, {headers})
            .then(response => {
                return response.data.result
            })
            .catch((e: AxiosError) => {
                console.log(e.message)
                return e.message
            })

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getFields = async (): Promise<string[]> => {
    try {
        const response = await axios.post(startUrl, {
            "action": "get_fields"
        }, {headers})
            .then(response => {
                return response.data.result
            })
            .catch((e: AxiosError) => {
                console.log(e.message)
                return e.message
            })
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getBrands = async (field: string, limit?: number, offset?: number): Promise<string[]> => {
    try {
        const response = await axios.post(startUrl, {
            "action": "get_fields",
            "params": {"field": field, "offset": offset, "limit": limit}
        }, {headers});

        return response.data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getFilter = async (params: filtersObjType): Promise<string[]> => {
    try {
        const response = await axios.post(startUrl, {
            "action": "filter",
            "params": params
        }, {headers})
            .then(response => {
                return response.data.result
            })
            .catch((e: AxiosError) => {
                console.log(e.message)
                return e.message
            })
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}