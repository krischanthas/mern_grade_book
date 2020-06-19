import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { updateCourse } from '../redux/actions/dataActions';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateCourse = (props) => {
    const [courseName, setCourseName] = useState(props.courseName);
    const [courseLength, setCourseLength] = useState(props.courseLength);
    const [ show, setShow ] = useState(false)
    
    
    
    const handleUpdate = (e) => {
        e.preventDefault();
        props.updateCourse(props.courseId, { courseName: courseName, courseLength: courseLength });
        setCourseName('');
        setCourseLength('');
        setShow(false);
    }
    

    return (
        <Fragment>
            <Button variant="warning" onClick={() => (setShow(true))}>Update</Button>

            {/* Add Course Modal */}
            <Modal show={show} onHide={() => (setShow(false))}>
                <Modal.Header closeButton>
                    <Modal.Title>Update course</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleUpdate}>
                    <Modal.Body>
                        {/* course component */}
                        <Form.Group controlId="formCourseName">
                            <Form.Label>Course Name:</Form.Label>
                            <Form.Control type="text" name="courseName" placeholder="Enter course name" onChange={(e) => (setCourseName(e.target.value)) } value={courseName} />
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
        </Fragment>
    )
    
}

export default connect(null, { updateCourse })(UpdateCourse);