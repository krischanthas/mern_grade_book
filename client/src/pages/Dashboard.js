import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import CourseList from '../components/CourseList';
import EnrollList from '../components/EnrollList';
import AddCourse from '../components/AddCourse';
import MyCourses from '../components/MyCourses';

import { Container, Row, Col } from 'react-bootstrap';



class Dashboard extends React.Component {

    render() {
        return (
            <div>
                {
                    this.props.auth.user !== null && this.props.auth.user.role === 'basic' ? (
                        <Fragment>
                            <Container>
                                <Row>
                                    <Col>
                                        <MyCourses />

                                    </Col>
                                    <Col lg="8" md="8">
                                        <EnrollList />

                                    </Col>
                                </Row>
                            </Container>
                        </Fragment>
                    ) : (
                            (this.props.auth.user !== null && this.props.auth.user.role === 'admin') ? (
                                <Fragment>
                                    <CourseList />
                                    <AddCourse />
                                </Fragment>)
                                : null
                        )

                }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth.auth
})
export default connect(mapStateToProps, {})(Dashboard);









// const Dashboard = () => {
//     const user = useSelector(state => state.auth.auth.user);
//     console.log(user);
//     // const RenderLists = user.role === 'basic' ? (<Fragment><EnrollList /></Fragment>) : (<Fragment><CourseList /><AddCourse /></Fragment>);

//     return (
//         <div>
//             {/* {RenderLists} */}
//         </div>

//     )
// }