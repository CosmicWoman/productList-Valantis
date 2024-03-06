import {createSlice} from "@reduxjs/toolkit";

export const FILTER_PRICE = 'FILTER_PRICE'

export const priceFilter = (price: number) => ({
    type: FILTER_PRICE,
    payload: price
})

const initialState = 0

export function priceReducer(state = initialState, action: {type: string, payload: number})
{
    switch (action.type) {
        case FILTER_PRICE: {
            return action.payload
            break
        }
        default:
            return state
    }
}


