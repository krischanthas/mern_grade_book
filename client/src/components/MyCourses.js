import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getBasicUserCourses } from '../redux/actions/basicUserActions';
import { Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyCourses = (props) => {
    const [courseList, setCourses] = useState([]);

    useEffect(() => {
        props.getBasicUserCourses();
    }, [])

    useEffect(() => {
        setCourses(props.basic.myCourses);
    }, [props.basic.myCourses])

    return (
        <div>
            <Card className="mt-4 shadow p-2 mb-5 bg-white rounded" >
                <Card.Body>
                    <Card.Title>My Courses</Card.Title>
                    <Table responsive className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Course</th>
                                <th scope="col">Instructor</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (courseList.length > 0) ?
                                    (
                                        courseList.map((course) => (
                                            <tr key={course._id}>
                                                <td>{course.courseName}</td>
                                                <td>{course.instructor}</td>
                                                <td align="center"><Link to={`/grades/${course._id}`}><img src="go-arrow.png" width="20" /></Link></td>
                                            </tr>
                                        ))
                                    ) : null
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    )
}
const mapStateToProps = state => ({
    basic: state.basic
})
export default connect(mapStateToProps, { getBasicUserCourses })(MyCourses);
