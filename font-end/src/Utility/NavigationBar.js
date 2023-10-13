import { authContext } from "../context/AuthContext";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Toggle from "./Toggle";

function NavigationBar() {
  const {admin} = useContext(authContext)
  const adminChek = localStorage.getItem('admin')

  return (
    <div className="z-3 position-absolute ">
      <Navbar
        expand="expand-sm"
        className="p-0"
        style={{
          width: "390px",
          backgroundColor: "rgba(204, 49, 17, 1)",
        }}
      >
        <Container className="p-0 m-0">
          <Navbar.Brand href={adminChek?"/fielddashboard":"/home"} className="logo text-light">
            Ballon d'Or
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="toggle border border-danger"
            style={{
              marginRight: "24px",
              marginBottom: "26px",
              marginTop: "26px",
            }}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className=""
            style={{
              backgroundColor: "rgb(250, 250, 250)",
            }}
          >
            <Toggle />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
