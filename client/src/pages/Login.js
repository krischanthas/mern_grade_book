import React, { useState } from 'react';
// redux
import { connect } from 'react-redux';
import { logIn } from "../redux/actions";

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.logIn(email, password);

    }

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" className="form-control" onChange={(e) => (setEmail(e.target.value))} />
                    <label>Password</label>
                    <input type="text" name="password" className="form-control" onChange={(e) => (setPassword(e.target.value))} />
                    <button className="btn btn-primary mt-4">Login</button>
                </div>
            </form>
        </div>
    )
}

export default connect(null, { logIn })(Login);