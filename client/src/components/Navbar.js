import React, { Component } from "react";
import { Link } from "react-router-dom";

const linkStyle = {
    textDecoration: "none"
};

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleMobile: false
        };
    }

    handleToggle = () => {
        this.setState({
            toggleMobile: !this.state.toggleMobile
        })
        console.log('clicked');
    };

    render() {
        return (
            <nav className="nav-container">
                <div className="logo">
                    <h4>Gradebook</h4>
                </div>

                <div
                    className={this.state.toggleMobile ? "nav-active link-container" : "link-container"}

                >
                    <Link to="/" style={linkStyle}>
                        <div className="nav-item">Home</div>
                    </Link>
                    <Link to="/login" style={linkStyle}>
                        <div className="nav-item">Login</div>
                    </Link>
                    <Link to="/register" style={linkStyle}>
                        <div className="nav-item">Register</div>
                    </Link>
                </div>

                <div className="burger" onClick={this.handleToggle}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        );
    }
}
