// ./redux/action/index.js
import { LOGGED_IN, LOGGED_OUT, SET_USER, AUTHENTICATED } from "../types";
import axios from 'axios'

export const register = (userInput) => dispatch => {
    axios
        .post('http://localhost:7000/api/users/register', {
            name: userInput.name,
            email: userInput.email,
            password: userInput.password
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
}

export const logIn = (email, password) => dispatch => {
    axios
        .post('http://localhost:7000/api/users/login', { email, password })
        .then(response => {
            dispatch(setAuthorizationHeader(response.data.token));
            dispatch({ type: SET_USER, payload: response.data.user })
            // dispatch(getUserData());
        })
        .catch(error => console.log(error))
}


// export const getUserData = () => dispatch => {
//     axios.get('http://localhost:7000/api/courses/', { email, password })
// }

/**  
 * store the token - although this is a XSS vulnerability..
 * not vulnerable to csrf since it can only be access by origin domain 
 * */
export const setAuthorizationHeader = token => dispatch => {
    const bearer = `Bearer ${token}`;
    localStorage.setItem("auth-token", bearer);
    axios.defaults.headers.common["Authorization"] = bearer;
    dispatch({ type: AUTHENTICATED });
};