import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../assets/images/logo.png";

const PrivateNavbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("blogData");
    toast.success("Logout successfull", {
      position: "top-right",
      autoClose: true,
    });
    navigate("/login");
  };
  return (
    <Navbar className="nav">
      <Nav className="text-center align-center">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        {(auth.role === 1 || auth.role === 2) && (
          <NavLink to="/categories">Categories</NavLink>
        )}
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/setting">Setting</NavLink>
        <NavLink to="/login" onClick={handleLogout}>
          Logout
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default PrivateNavbar;
