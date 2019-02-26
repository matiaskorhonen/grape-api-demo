import React from "react";
import { Container, Row, Col, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import axios from "axios";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut(event) {
    event.preventDefault();

    let params = {};
    params[this.props.csrfParam] = this.props.csrfToken;

    axios
      .delete("/users/sign_out", {
        params: params,
        maxRedirects: 0,
      })
      .then(response => {
        window.location = "/";
      })
      .catch(error => {
        window.location = "/";
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm="12">
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Todo</NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="#" onClick={this.handleLogOut}>
                    Log out
                  </NavLink>
                </NavItem>
              </Nav>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <h1>TodoApp</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TodoApp;
