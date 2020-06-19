import React from 'react'
import { connect } from 'react-redux';
import { deleteGrade } from '../redux/actions/dataActions';

const DeleteGrade = (props) => {

    const handleDelete = () => {
        props.deleteGrade(props.gradeId);
    }
    
    return (
        <div>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
    )
    
}

export default connect(null, {deleteGrade})(DeleteGrade);