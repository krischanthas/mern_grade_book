import React from 'react';
import { connect } from 'react-redux';
import DeleteCourse from './DeleteCourse';
import UpdateCourse from './UpdateCourse';
import { Link } from 'react-router-dom';
import { getMyCourses } from "../redux/actions/dataActions";
// bootstrap
import { Table } from 'react-bootstrap';

class CourseList extends React.Component {

    componentDidMount() {
        this.props.getMyCourses();
    }

    render() {
        return (
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
                        this.props.courses.map((course, index) => (
                            <tr key={course._id}>
                                <td><Link to={`/courses/${course._id}`} >{course.courseName}</Link></td>
                                <td>{course.instructor}</td>
                                <td>{course.courseLength}</td>
                                <td>{course.createdDate}</td>
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
        )
    }
}
const mapStateToProps = state => ({
    courses: state.data.courses
})
export default connect(mapStateToProps, { getMyCourses })(CourseList);
