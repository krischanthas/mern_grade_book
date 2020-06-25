import React, { Fragment, useState } from 'react';
// redux
import { connect } from 'react-redux';
import { register } from "../redux/actions";
import { Alert, Card, Container, Row, Col } from 'react-bootstrap';

const Registration = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('basic');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.register({ name, email, password, role });

    }
    const alert = (props.UI.errors) ? (<Alert variant="danger">{props.UI.errors.message}</Alert>) : null;

    return (
        <Fragment>

            <h1 className="text-center pt-5">Register</h1>
            {alert}
            <Card style={{ width: '50%' }} className="mx-auto shadow p-3 mb-5 bg-white rounded">
                <Card.Body>
                    <Container>
                        <Row className="justify-content-center align-items-center">
                            <Col className="col-md-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="text-info">Name</label>
                                        <input type="text" name="name" className="form-control" onChange={(e) => (setName(e.target.value))} />
                                        <label className="text-info">Email</label>
                                        <input type="text" name="email" className="form-control" onChange={(e) => (setEmail(e.target.value))} />
                                        <label className="text-info">Password</label>
                                        <input type="text" name="password" className="form-control" onChange={(e) => (setPassword(e.target.value))} />
                                        <label className="text-info">Role</label>
                                        <select name="role" className="form-control" onChange={(e) => (setRole(e.target.value))}>
                                            <option></option>
                                            <option value="basic">Basic</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button className="btn btn-primary mt-4">Submit</button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Fragment>

    )
}
const mapStateToProps = state => ({
    UI: state.UI
})
export default connect(mapStateToProps, { register })(Registration);