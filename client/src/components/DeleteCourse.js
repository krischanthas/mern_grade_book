import React from 'react'
import { connect } from 'react-redux';
import { deleteCourse } from '../redux/actions/dataActions';

const DeleteCourse = (props) => {

    const handleDelete = () => {
        props.deleteCourse(props.courseId);
    }
    
    return (
        <div>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
    )
    
}

export default connect(null, {deleteCourse})(DeleteCourse);