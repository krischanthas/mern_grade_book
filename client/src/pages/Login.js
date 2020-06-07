import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { logIn } from "../redux/actions";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.logIn(this.state.email, this.state.password);
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <input type="text" name="email" onChange={this.handleChange}/>
                    <label>Password</label>
                    <input type="text" name="password" onChange={this.handleChange}/>
                    <button>Login</button>
                </form>
            </div>
        )
    }
}

export default connect(null, {logIn})(Login);