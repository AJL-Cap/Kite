import React from "react";
import fire from "./fire";
import { useAuthState } from "react-firebase-hooks/auth";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// import styled from 'styled-components';

export default function NavigationBar() {
  const [user, initialising, error] = useAuthState(fire.auth());
  const history = useHistory();

  const signOut = () => {
    fire.auth().signOut();
    history.push("/");
  };

  if (initialising || error) {
    return (
      <Navbar expand="lg">
        <Navbar.Brand href="/">Kite</Navbar.Brand>
      </Navbar>
    );
  }

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#FFCAD4" }}>
      <Navbar.Brand href="/">Kite</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {user ? (
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link href="/players">Players</Nav.Link>
            </Nav.Item> */}
            <Nav.Item>
              <Nav.Link href="/games">Games</Nav.Link>
            </Nav.Item>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={signOut}
            >
              Sign out
            </button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/signup">Sign up</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/viewGames">Games</Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

// const Title = styled.h1`
//   font-size: 1.5em;
//   text-align: center
// `
