import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAvailableCourses, enrollCourse } from '../redux/actions/basicUserActions';
import { Table, Card, Button, Modal } from 'react-bootstrap';
import moment from 'moment'
import PaginationList from './PaginationList';
import { getCourseInfo } from '../redux/actions/basicUserActions';

const EnrollList = (props) => {


    const [courseList, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(5);
    const [show, setShow] = useState(false)


    useEffect(() => {
        props.getAvailableCourses();
    }, [])

    useEffect(() => {
        setCourses(props.basic.availableCourses);
    }, [props.basic.availableCourses])

    const handleClick = (courseId) => {
        props.enrollCourse(courseId);
    }

    const showCourseInfo = (courseId) => {
        props.getCourseInfo(courseId);
        setShow(true);
    }

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourse = courseList.slice(indexOfFirstCourse, indexOfLastCourse);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div>
            <Card className="mt-4 shadow p-3 mb-5 bg-white rounded" >
                <Card.Body>
                    <Card.Title>Open Enrollment</Card.Title>
                    <Table responsive className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Course</th>
                                <th></th>
                                <th scope="col">Instructor</th>
                                <th scope="col">Length</th>
                                <th scope="col">Created</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (courseList.length > 0) ?
                                    (
                                        currentCourse.map((course) => (
                                            <tr key={course._id}>
                                                <td>{course.courseName}</td>
                                                <td align="center" onClick={() => showCourseInfo(course._id)} ><img src="info.png" alt="info" width="20" /></td>
                                                <td>{course.instructor}</td>
                                                <td>{course.courseLength}</td>
                                                <td>{moment(course.createdDate).format('LL')}</td>
                                                <td>
                                                    <Button varient="info" onClick={() => handleClick(course._id)}>Enroll</Button>
                                                </td>

                                            </tr>
                                        ))
                                    ) : null
                            }
                        </tbody>
                    </Table>
                </Card.Body>
                <PaginationList coursesPerPage={coursesPerPage} totalCourses={courseList.length} paginate={paginate} />
            </Card>

            <Modal show={show} onHide={() => (setShow(false))} >
                <Modal.Header closeButton>
                    <Modal.Title> {props.basic.courseInfo.courseName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.basic.courseInfo.description}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
const mapStateToProps = state => ({
    basic: state.basic,
})
export default connect(mapStateToProps, { getAvailableCourses, enrollCourse, getCourseInfo })(EnrollList);