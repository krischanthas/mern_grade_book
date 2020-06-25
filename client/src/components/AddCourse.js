import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addCourse } from '../redux/actions/dataActions';

// bootstrap
import { Button, Form, Modal } from 'react-bootstrap'

const AddCourse = (props) => {

    const [name, setName] = useState('');
    const [length, setLength] = useState('');
    const [description, setDescr] = useState('');
    const [show, setShow] = useState(false);

    const handleAddClick = (e) => {
        e.preventDefault();
        props.addCourse({ courseName: name, courseLength: length, description });
        setName('');
        setLength('');
        setDescr('');
        setShow(false);
    }

    return (
        <div className="container">
            <Button className="mt-4" variant="primary" onClick={() => (setShow(true))}>Add Course</Button>

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
                            <Form.Control type="text" name="courseName" placeholder="Enter course name" onChange={(e) => (setName(e.target.value))} value={name} />
                            <Form.Text className="text-muted">Course name must be unique</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formCourseLength">
                            <Form.Label>Course Length: </Form.Label>
                            <Form.Control type="text" name="courseLength" placeholder="Enter course length" onChange={(e) => (setLength(e.target.value))} value={length} />
                        </Form.Group>
                        <Form.Group controlId="formCourseDescription">
                            <Form.Label>Description: </Form.Label>
                            <Form.Control type="text" name="description" placeholder="Describe this course" onChange={(e) => (setDescr(e.target.value))} value={description} />
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

