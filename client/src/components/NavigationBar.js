import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logOut } from "../redux/actions/index";


const NavigationBar = (props) => {

    const handleSignOut = () => {
        props.logOut();
    }

    const logInOption = (props.auth.isAuthenticated) ? (
        <NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
    ) : (
            <Fragment>
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
            </Fragment>
        );

    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="container-fluid">
            <Navbar.Brand href="/">Gradebook</Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav className="justify-content-end mr-5">
                    <Nav.Item>
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>

                    </Nav.Item>
                    <Nav.Item>
                        <NavDropdown title="User" id="collasible-nav-dropdown">
                            {logInOption}
                        </NavDropdown>
                    </Nav.Item>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth.auth
})

export default connect(mapStateToProps, { logOut })(NavigationBar)