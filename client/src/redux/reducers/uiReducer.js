import { LOADING_UI, LOADING_END, SET_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {
    // ui: {
    //     errors: null,
    //     loading: false
    // }
    errors: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case LOADING_END:
            return {
                ...state,
                loading: false
            }
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            }
        default:
            return state;
    }
}