import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Card } from 'react-bootstrap';
import { addGradeAction } from '../redux/actions/dataActions';
import { getAllUsers } from "../redux/actions/dataActions";
import { Typeahead } from 'react-bootstrap-typeahead';

class AddGrade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {},
            grade: '',
            gradeDescription: ''
        }
    }

    componentDidMount() {
        // load typeahead dropdown options
        this.props.getAllUsers('basic');

    }

    handleAddClick = (e) => {
        e.preventDefault();
        this.props.addGradeAction({
            userId: this.state.student.id,
            userName: this.state.student.label,
            courseId: this.props.courseId,
            gradeDescription: this.state.gradeDescription,
            grade: this.state.grade
        });
    };


    render() {
        return (

            // <Card style={{ width: '18rem' }}>
            <Card>
                <Card.Body>
                    <Card.Title>Add User Grade</Card.Title>
                    <Form onSubmit={this.handleAddClick}>

                        <Form.Group controlId="formCourseName">
                            <Form.Label>User</Form.Label>
                            <Typeahead
                                id="users"
                                minLength={3}
                                options={this.props.users}
                                onChange={(selected) => {
                                    this.setState({ student: selected[0] })
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formGradeDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="gradeDescription" placeholder="Enter description" onChange={(e) => (this.setState({ gradeDescription: e.target.value }))} value={this.state.gradeDescription} />
                        </Form.Group>
                        <Form.Group controlId="formCourseLength">
                            <Form.Label>Grade</Form.Label>
                            <Form.Control type="number" name="grade" placeholder="Enter grade" onChange={(e) => (this.setState({ grade: e.target.value }))} value={this.state.grade} />
                        </Form.Group>

                        <Button variant="primary" type="submit">Submit</Button>

                    </Form>
                </Card.Body>
            </Card>

        )
    }
}
const mapStateToProps = state => ({
    users: state.data.users
})
export default connect(mapStateToProps, { getAllUsers, addGradeAction })(AddGrade);