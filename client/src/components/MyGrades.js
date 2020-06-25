import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCourseGrades } from '../redux/actions/basicUserActions';
import { Table, Card } from 'react-bootstrap';
import moment from 'moment'

const MyGrades = (props) => {
    const courseId = props.match.params.courseId;


    useEffect(() => {
        props.getCourseGrades(courseId);
    }, [])

    return (
        <Fragment>
            <Card>
                <Card.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Description</th>
                                <th>Grade</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.grades.map(grade => (
                                <tr key={grade._id}>
                                    <td>{grade.courseId}</td>
                                    <td>{grade.gradeDescription}</td>
                                    <td>{grade.grade}</td>
                                    <td>{moment(grade.date).format('LL')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    ...state,
    grades: state.basic.grades
})
export default connect(mapStateToProps, { getCourseGrades })(MyGrades);