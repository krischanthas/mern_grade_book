// ./redux/action/index.js
import { USER_LOADED, USER_LOGGED_OUT, LOADING_UI, LOADING_END, SET_ERRORS, CLEAR_ERRORS } from "../types";
import axios from 'axios'
import history from '../history';
import { getMyCourses } from "./dataActions";
import { getBasicUserCourses } from "./basicUserActions";


/**
 * User Authentication
 */
export const register = (userInput) => dispatch => {
    dispatch({ type: LOADING_UI });

    axios
        .post('http://localhost:7000/api/users/register', {
            name: userInput.name,
            email: userInput.email,
            password: userInput.password,
            role: userInput.role
        })
        .then(response => {
            // console.log(response);
            history.push('/login');

            dispatch({ type: LOADING_END });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(error => {
            console.log(error);
            dispatch({ type: SET_ERRORS, payload: error.response.data });
        });
}

export const logIn = (email, password) => dispatch => {
    dispatch({ type: LOADING_UI });

    axios
        .post('http://localhost:7000/api/users/login', { email, password })
        .then(response => {
            setAuthorizationHeader(response.data.token);
            dispatch({ type: USER_LOADED, payload: response.data.user });
            // calling this might be redundant, double check
            dispatch(getUserData());
            history.push('/dashboard');

            dispatch({ type: LOADING_END });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(error => {
            console.log(error);
            dispatch({ type: SET_ERRORS, payload: error.response.data });
        })
}

export const logOut = () => dispatch => {
    localStorage.removeItem("authToken");
    dispatch({ type: USER_LOGGED_OUT });
    history.push('/');
}

/**
 * Fetch logged in user's information
 */
export const getUserData = () => dispatch => {
    dispatch({ type: LOADING_UI });

    axios
        .get('http://localhost:7000/api/users/user')
        .then(response => {
            dispatch({ type: USER_LOADED, payload: response.data.user });
            if (response.data.user.role === 'admin') {
                dispatch(getMyCourses());
            } else if (response.data.user.role === 'basic') {
                dispatch(getBasicUserCourses());
            }

            dispatch({ type: LOADING_END })

        })
        .catch(error => console.log(error));
}

/**  
 * store the token - although this is a XSS vulnerability..
 * not vulnerable to csrf since it can only be access by origin domain 
 * */
export const setAuthorizationHeader = token => {
    const bearer = `Bearer ${token}`;
    localStorage.setItem("authToken", bearer);
    axios.defaults.headers.common["Authorization"] = bearer;
};

