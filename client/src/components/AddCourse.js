import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addCourse } from '../redux/actions/dataActions';

// bootstrap
import { Button, Form, Modal } from 'react-bootstrap'

const AddCourse = (props) => {

    const [courseName, setCourseName] = useState('');
    const [courseLength, setCourseLength] = useState('');
    const [show, setShow] = useState(false);

    const handleAddClick = (e) => {
        e.preventDefault();
        props.addCourse({ courseName, courseLength });
        setCourseName('');
        setCourseLength('');
        setShow(false);
    }
    
    return (
        <div className="container">
            <Button variant="primary" onClick={() => (setShow(true))}>Add Course</Button>

            {/* Add Course Modal */}
            <Modal show={show} onHide={() => (setShow(false))}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a course</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleAddClick}>
                    <Modal.Body>
                        {/* course component */}
                        <Form.Group controlId="formCourseName">
                            <Form.Label>Course Name:</Form.Label>
                            <Form.Control type="text" name="courseName" placeholder="Enter course name" onChange={(e) => (setCourseName(e.target.value))} value={courseName} />
                            <Form.Text className="text-muted">Course name must be unique</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formCourseLength">
                            <Form.Label>Course Length: </Form.Label>
                            <Form.Control type="text" name="courseLength" placeholder="Enter course length" onChange={(e) => (setCourseLength(e.target.value))} value={courseLength} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>

            </Modal>
        </div>
    )
    
}

const mapStateToProps = (state) => ({
    courses: state.data.courses
});

export default connect(mapStateToProps, { addCourse })(AddCourse);

