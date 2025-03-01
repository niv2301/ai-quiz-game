import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">My Quiz Game</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link href="#home">בית</Nav.Link>
        <Nav.Link href="#features">תכנים</Nav.Link>
        <Nav.Link href="#pricing">מחירים</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default MyNavbar;
