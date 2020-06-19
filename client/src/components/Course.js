import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getCourse, getAllGrades } from '../redux/actions/dataActions';
import AddGrade from './AddGrade';
import { Table, Container, Row, Col } from 'react-bootstrap';
import DeleteGrade from './DeleteGrade';
import EditGrade from './EditGrade';


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
                <Container fluid={true}>
                    <Row>
                        <Col sm={8}>
                            <Table responsive className="table ">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">User</th>
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
                                                    <td>{grade.grade}</td>
                                                    <td>{grade.date}</td>
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
                        </Col>
                        <Col sm={4}>
                            <AddGrade courseId={courseId} />
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
