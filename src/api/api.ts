import axios from "axios";
import axiosRetry from "axios-retry";
import md5 from "md5";
import {FiltersType, ProductItemsType} from "./authApiTypes";
import {filtersObjType} from "../types/types";

const startUrl = "https://api.valantis.store:41000/"
const password = 'Valantis'
const stamp = new Date().toISOString().slice(0,10).replace(/-/g, '')
const xAuth = md5(password + '_' + stamp)
const attempts = 5

axiosRetry(axios, {
    retries: attempts,
    shouldResetTimeout: true,
});

const headers = {
    'X-Auth': xAuth,
    'Content-Type': 'application/json',
};

export const getIds = async (offset?: number, limit?: number): Promise<string[]> => {
    try {
        const response = await axios.post(startUrl, {
            action: "get_ids",
            params: {"offset": offset, "limit": limit},
        }, {headers});
        console.log(response.status)
        return response.data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getItems = async (ids: string[]): Promise<ProductItemsType[]> => {
    try {
        const response = await axios.post(startUrl, {
            action: "get_items",
            params: {ids},
        }, {headers});

        console.log(response.status)
        return response.data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getFields = async ():Promise<string[]> => {
    try {
        const response = await axios.post(startUrl, {
            "action": "get_fields"
        }, {headers});
        console.log(response.status)
        return response.data.result;
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

export const getFilter = async (params: filtersObjType):Promise<string[]> => {
    try {
        const response = await axios.post(startUrl, {
            "action": "filter",
            "params": params
        }, {headers});
        console.log(response.status)
        return response.data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}