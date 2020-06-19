import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { editGrade } from '../redux/actions/dataActions';
import { Modal, Button, Form } from 'react-bootstrap';

const EditGrade = (props) => {
    const [userName, setUserName] = useState(props.userName);
    const [courseGrade, setGrade] = useState(props.courseGrade);
    const [show, setShow] = useState(false)



    const handleUpdate = (e) => {
        e.preventDefault();
        props.editGrade(props.gradeId, { userName, grade: courseGrade });
        setUserName('');
        setGrade('');
        setShow(false);
    }


    return (
        <Fragment>
            <Button variant="warning" onClick={() => (setShow(true))}>Update</Button>

            {/* Add Course Modal */}
            <Modal show={show} onHide={() => (setShow(false))}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit {userName}'s grade</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleUpdate}>
                    <Modal.Body>
                        {/* course component */}
                        <Form.Group controlId="formCourseName">
                            <Form.Label>User:</Form.Label>
                            <Form.Control type="text" name="userName" placeholder="Enter user name" onChange={(e) => (setUserName(e.target.value))} value={userName} />
                            <Form.Text className="text-muted">Course name must be unique</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formCourseLength">
                            <Form.Label>Grade: </Form.Label>
                            <Form.Control type="text" name="grade" placeholder="Enter course grade" onChange={(e) => (setGrade(e.target.value))} value={courseGrade} />
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

export default connect(null, { editGrade })(EditGrade);