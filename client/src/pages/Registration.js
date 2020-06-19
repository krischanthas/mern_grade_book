import React, { useState } from 'react';
// redux
import { connect } from 'react-redux';
import { register } from "../redux/actions";

const Registration = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('basic');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.register({ name, email, password, role });

    }

    return (
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" onChange={(e) => (setName(e.target.value))} />
                    <label>Email</label>
                    <input type="text" name="email" className="form-control" onChange={(e) => (setEmail(e.target.value))} />
                    <label>Password</label>
                    <input type="text" name="password" className="form-control" onChange={(e) => (setPassword(e.target.value))} />
                    <label>Role</label>
                    <select name="role" className="form-control" onChange={(e) => (setRole(e.target.value))}>
                        <option></option>
                        <option value="basic">Basic</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button className="btn btn-primary mt-4">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default connect(null, { register })(Registration);