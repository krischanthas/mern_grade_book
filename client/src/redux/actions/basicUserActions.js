import Axios from "axios";
import {
    SET_BASIC_USER_COURSES, SET_AVAILABLE_COURSES,
    LOADING_UI, LOADING_END, SET_ERRORS, CLEAR_ERRORS, ENROLLED_COURSE, SET_COURSE_INFO, SET_GRADES
} from '../types';


/**
 * Course Actions
 */
export const getBasicUserCourses = () => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .get('http://localhost:7000/api/b/courses/myCourses')
        .then(response => {
            // console.log(response.data)
            dispatch({ type: SET_BASIC_USER_COURSES, payload: response.data });

            dispatch({ type: LOADING_END })
            dispatch({ type: CLEAR_ERRORS });

        })
        .catch(error => {
            console.log(error.response.data)
            dispatch({ type: SET_ERRORS, payload: error.response.data })
        });
}

export const getAvailableCourses = () => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .get(`http://localhost:7000/api/b/courses/available`)
        .then(response => {
            // console.log(response.data)
            dispatch({ type: SET_AVAILABLE_COURSES, payload: response.data })

            dispatch({ type: LOADING_END })
        })
        .catch(error => console.log(error));
}

export const enrollCourse = (courseId) => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .patch(`http://localhost:7000/api/b/courses/available/${courseId}`)
        .then(response => {
            console.log('Enrolled', response.data);
            // dispatch action to update state, enrolled course shoul dbe reflected in myCourses
            dispatch({ type: ENROLLED_COURSE, payload: response.data })
        })
        .catch(error => console.log(error));
}

export const getCourseInfo = (courseId) => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .get(`http://localhost:7000/api/b/courses/available/${courseId}`)
        .then(response => {
            dispatch({ type: SET_COURSE_INFO, payload: response.data[0] })

            dispatch({ type: LOADING_END })
        })
        .catch(error => console.log(error));
}

export const getCourseGrades = (courseId) => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .get(`http://localhost:7000/api/b/grades/${courseId}`)
        .then(response => {
            dispatch({ type: SET_GRADES, payload: response.data });
        })
        .catch(error => console.log(error));
}