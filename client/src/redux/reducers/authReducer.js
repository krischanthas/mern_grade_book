import { USER_LOADED, USER_LOADING, USER_LOADING_END, USER_LOGGED_OUT } from '../types';

const initialState = {
    auth: {
        token: localStorage.getItem('authToken'),
        isAuthenticated: null,
        isLoading: false,
        user: null
    }

}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                auth: {
                    isAuthenticated: true,
                    isLoading: false,
                    user: action.payload
                }

            }
        case USER_LOADING:
            return {
                ...state,
                auth: {
                    isLoading: true
                }
            }
        case USER_LOADING_END:
            return {
                ...state,
                auth: {
                    isLoading: false
                }
            }
        case USER_LOGGED_OUT: 
            return {
                ...state,
                auth: {
                    isAuthenticated: null,
                    isLoading: false,
                    user: null
                }
            }
        default:
            return {
                ...state
            }
    }
}


