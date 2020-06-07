import { AUTHENTICATED, UNAUTHENTICATED, SET_USER } from '../types';

const initialState = {
    user: {},
    authenticated: false
}

export default function( state = initialState, action ) {
    switch(action.type) {
        case AUTHENTICATED: 
            return {
                authenticated: true
            }
        
        case UNAUTHENTICATED: 
            return {
                authenticated: false
            }
        
        case SET_USER: 
            return {
                ...state,
                user: action.payload
            }
        
        default: 
            return {...state}
        
    }
} 