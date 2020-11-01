import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

class Headerbar extends Component {
  render() {
    return (
      <div className="header">
        <Navbar bg="light" expand="lg" fixed="top">
          <Navbar.Brand href="#home">Image search sample</Navbar.Brand>
          <Nav className="ml-auto">
            <button>
              <Link className="nav-links" to="/login">
                JOIN
              </Link>
            </button>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
export default Headerbar;
