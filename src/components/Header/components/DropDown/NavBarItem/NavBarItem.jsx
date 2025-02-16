import "./NavBarItem.css";
import { NavDropdown } from "react-bootstrap";
export const NavBarItem = ({ to, children }) => (
  <NavDropdown.Item className="navbar-item dropdown-item" href={to}>
    {children}
  </NavDropdown.Item>
);
