import { SET_COURSES_DATA, SET_COURSE, COURSE_ADDED, COURSE_DELETED, COURSE_UPDATED, USERS_FETCHED, GRADE_ADDED, GRADES_FETCHED, GRADE_UPDATED, GRADE_DELETED } from '../types';


const initialState = {
    courses: [],
    course: {},
    grades: [],
    users: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        // Courses
        case SET_COURSES_DATA:
            return {
                ...state,
                courses: [...action.payload]
            }
        case SET_COURSE:
            return {
                ...state,
                course: action.payload
            }
        case COURSE_ADDED:
            return {
                ...state,
                courses: [...state.courses, action.payload]
            }
        case COURSE_DELETED:
            return {
                ...state,
                courses: state.courses.filter(course => course._id !== action.payload)
            }
        case COURSE_UPDATED:
            return {
                ...state,
                courses: state.courses.map((course) => {
                    if (course._id === action.payload._id) {
                        return action.payload
                    }
                    return course;
                })
            }
        // Users
        case USERS_FETCHED:
            const usersForTypeahead = action.payload.map(user => {
                let temp = {};
                temp.id = user._id;
                temp.label = user.name;
                return temp;
            });
            return {
                ...state,
                users: [...usersForTypeahead]
            }
        // Grades
        case GRADES_FETCHED:
            return {
                ...state,
                grades: [...action.payload]
            }
        case GRADE_ADDED:
            return {
                ...state,
                grades: [...state.grades, action.payload]
            }
        case GRADE_UPDATED:
            return {
                ...state,
                grades: state.grades.map((grade) => {
                    if (grade._id === action.payload._id) {
                        return action.payload
                    }
                    return grade;
                })
            }
        case GRADE_DELETED:
            return {
                ...state,
                grades: state.grades.filter(grade => grade._id !== action.payload)
            }


        default:
            return state;
    }
}