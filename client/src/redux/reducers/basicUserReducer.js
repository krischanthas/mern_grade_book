import { SET_AVAILABLE_COURSES, SET_BASIC_USER_COURSES, ENROLLED_COURSE, SET_COURSE_INFO, SET_GRADES } from '../types';


const initialState = {
    availableCourses: [],
    myCourses: [],
    selectedCourse: {},
    courseInfo: {},
    grades: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AVAILABLE_COURSES:
            return {
                ...state,
                availableCourses: [...action.payload]
            }
        case SET_BASIC_USER_COURSES:
            return {
                ...state,
                myCourses: [...action.payload]
            }
        case ENROLLED_COURSE:
            return {
                ...state,
                myCourses: [...state.myCourses, action.payload],
                availableCourses: state.availableCourses.filter(course => course._id !== action.payload._id)
            }
        case SET_COURSE_INFO:
            return {
                ...state,
                courseInfo: action.payload
            }
        case SET_GRADES:
            return {
                ...state,
                grades: [...action.payload]
            }
        default:
            return state;
    }
}