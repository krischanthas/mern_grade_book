import Axios from "axios";
import {
    SET_COURSES_DATA, SET_COURSE, COURSE_ADDED, COURSE_DELETED,
    COURSE_UPDATED, USERS_FETCHED, GRADE_ADDED, GRADES_FETCHED, GRADE_DELETED, GRADE_UPDATED,
    LOADING_UI, LOADING_END, SET_ERRORS, CLEAR_ERRORS
} from '../types';


/**
 * Course Actions
 */
export const getMyCourses = () => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .get('http://localhost:7000/api/courses/')
        .then(response => {
            dispatch({ type: SET_COURSES_DATA, payload: response.data });

            dispatch({ type: LOADING_END })
            dispatch({ type: CLEAR_ERRORS });

        })
        .catch(error => {
            console.log(error.response.data)
            dispatch({ type: SET_ERRORS, payload: error.response.data })
        });
}

export const getCourse = (courseId) => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .get(`http://localhost:7000/api/courses/${courseId}`)
        .then(response => {
            dispatch({ type: SET_COURSE, payload: response.data[0] })

            dispatch({ type: LOADING_END })
        })
        .catch(error => console.log(error));
}

export const addCourse = (formData) => dispatch => {
    dispatch({ type: LOADING_UI });
    console.log(formData)
    Axios
        .post('http://localhost:7000/api/courses/add', formData)
        .then(response => {
            dispatch({ type: COURSE_ADDED, payload: response.data })

            dispatch({ type: LOADING_END })
        })
        .catch(error => console.log(error));
}

export const updateCourse = (courseId, updateData) => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .patch(`http://localhost:7000/api/courses/${courseId}`, updateData)
        .then(response => {
            console.log(response.data);
            dispatch({ type: COURSE_UPDATED, payload: response.data })

            dispatch({ type: LOADING_END })
        })
        .catch(error => console.log(error));
}

export const deleteCourse = (courseId) => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .delete(`http://localhost:7000/api/courses/${courseId}`)
        .then(response => {
            dispatch({ type: COURSE_DELETED, payload: response.data.courseId })

            dispatch({ type: LOADING_END })
        })
        .catch(error => console.log(error));
}


export const getAllUsers = (role) => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .get(`http://localhost:7000/api/users/${role}`)
        .then(response => {
            dispatch({ type: USERS_FETCHED, payload: response.data });

            dispatch({ type: LOADING_END })
        })
        .catch(error => console.log(error))
}


/**
 * Grade actions
 */
export const getAllGrades = (courseId) => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .get(`http://localhost:7000/api/grades/${courseId}`)
        .then(response => {
            dispatch({ type: GRADES_FETCHED, payload: response.data });

            dispatch({ type: LOADING_END })
        })
        .catch(error => console.log(error))
}

export const addGradeAction = (gradeData) => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .post('http://localhost:7000/api/grades/add', gradeData)
        .then(response => {
            dispatch({ type: GRADE_ADDED, payload: response.data })

            dispatch({ type: LOADING_END })
        })
        .catch(error => console.log(error));
}

export const editGrade = (gradeId, updateData) => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .patch(`http://localhost:7000/api/grades/${gradeId}`, updateData)
        .then(response => {
            dispatch({ type: GRADE_UPDATED, payload: response.data })

            dispatch({ type: LOADING_END })
        })
        .catch(error => console.log(error));
}

export const deleteGrade = (gradeId) => dispatch => {
    dispatch({ type: LOADING_UI });

    Axios
        .delete(`http://localhost:7000/api/grades/${gradeId}`)
        .then(response => {
            dispatch({ type: GRADE_DELETED, payload: response.data.gradeId })

            dispatch({ type: LOADING_END })
        })
        .catch(error => console.log(error));
}