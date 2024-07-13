import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <Navbar className="nav">
      <Nav className="text-center align-center">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;
