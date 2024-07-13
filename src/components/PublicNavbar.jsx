import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const PublicNavbar = () => {
  return (
    <Navbar className="nav">
      <Nav className="text-center align-center">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;
