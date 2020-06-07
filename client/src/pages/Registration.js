import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { register } from "../redux/actions";

class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.register(this.state);
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" onChange={this.handleChange}/>
                    <label>Email</label>
                    <input type="text" name="email" onChange={this.handleChange}/>
                    <label>Password</label>
                    <input type="text" name="password" onChange={this.handleChange}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { register })(Registration);