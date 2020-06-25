import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getCourse, getAllGrades } from '../redux/actions/dataActions';
import AddGrade from './AddGrade';
import { Table, Card, Container, Row, Col } from 'react-bootstrap';
import DeleteGrade from './DeleteGrade';
import EditGrade from './EditGrade';
import moment from 'moment';

class Course extends React.Component {

    componentDidMount() {
        this.props.getCourse(this.props.match.params.courseId);
        this.props.getAllGrades(this.props.match.params.courseId);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.grades.length !== this.props.grades.length) {
            this.props.getAllGrades(this.props.match.params.courseId);
        }
    }

    render() {
        const courseId = this.props.match.params.courseId;
        const grades = this.props.grades;
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col lg="8" md="8">
                            <Card className="mt-4 shadow p-3 mb-5 bg-white rounded">
                                <Card.Body>
                                    <Table responsive className="table ">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">User</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Grade</th>
                                                <th scope="col">Date</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                (grades) ? (
                                                    grades.map(grade => (
                                                        <tr key={grade._id}>
                                                            <td>{grade.userName}</td>
                                                            <td>{grade.gradeDescription}</td>
                                                            <td>{grade.grade}</td>
                                                            <td>{moment(grade.date).format('LL')}</td>
                                                            <td>
                                                                <DeleteGrade gradeId={grade._id} />
                                                            </td>
                                                            <td>
                                                                <EditGrade
                                                                    gradeId={grade._id}
                                                                    userName={grade.userName}
                                                                    courseGrade={grade.grade}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                        null
                                                    )
                                            }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="mt-4 shadow p-3 mb-5 bg-white rounded">
                                <Card.Body>
                                    <AddGrade courseId={courseId} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    course: state.data.course,
    grades: state.data.grades
})

export default connect(mapStateToProps, { getCourse, getAllGrades })(Course);
