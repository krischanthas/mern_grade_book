import { LOG_IN, LOG_OUT } from "../types";

export const logIn = (credentials) => ({
    type: LOG_IN,
    payload: credentials
})

export const logOut = () => ({
    type: LOG_OUT
})