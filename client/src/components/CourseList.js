import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DeleteCourse from './DeleteCourse';
import UpdateCourse from './UpdateCourse';
import { Link } from 'react-router-dom';
import { getMyCourses } from "../redux/actions/dataActions";
import moment from 'moment';

// bootstrap
import { Container, Table, Card } from 'react-bootstrap';
import PaginationList from './PaginationList';

const CourseList = (props) => {


    // const [courseList, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(10);

    useEffect(() => {
        props.getMyCourses();
    }, [])

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourse = props.courses.slice(indexOfFirstCourse, indexOfLastCourse);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Fragment>
            <Container>
                <Card>
                    <Card.Body>
                        <Table responsive className="table ">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Course</th>
                                    <th scope="col">Instructor</th>
                                    <th scope="col">Length</th>
                                    <th scope="col">Created</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentCourse.map((course, index) => (
                                        <tr key={course._id}>
                                            <td><Link to={`/courses/${course._id}`} >{course.courseName}</Link></td>
                                            <td>{course.instructor}</td>
                                            <td>{course.courseLength}</td>
                                            <td>{moment(course.createdDate).format('LL')}</td>
                                            <td>
                                                <DeleteCourse courseId={course._id} />
                                            </td>
                                            <td>
                                                <UpdateCourse
                                                    index={index}
                                                    courseId={course._id}
                                                    courseName={course.courseName}
                                                    courseLength={course.courseLength}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <PaginationList coursesPerPage={coursesPerPage} totalCourses={props.courses.length} paginate={paginate} />
                    </Card.Body>
                </Card>
            </Container>
        </Fragment>

    )

}
const mapStateToProps = state => ({
    courses: state.data.courses
})
export default connect(mapStateToProps, { getMyCourses })(CourseList);
