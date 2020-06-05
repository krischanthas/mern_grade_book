import { AUTHENTICATED, UNAUTHENTICATED } from '../types';

const initialState = {
    authenticated: false
}

export default function( state = initialState, action ) {
    switch(action.type) {
        case AUTHENTICATED: {
            return {
                ...state,
                authenticated: true
            }
        }
        case UNAUTHENTICATED: {
            return {
                authenticated: false
            }
        }
    }
} 