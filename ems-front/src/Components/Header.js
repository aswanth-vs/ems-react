import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar bg="primary" variant="primary">
      <Container>
        <Navbar.Brand href="/">
          <i class="fa-solid fa-layer-group fa-spin"></i> EMS Application{" "}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
