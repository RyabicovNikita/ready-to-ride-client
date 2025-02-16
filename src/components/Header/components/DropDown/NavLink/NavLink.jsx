import { Nav } from "react-bootstrap";
import "./NavLink.css";
export const NavLink = ({ children, to }) => (
  <Nav.Link className="link" href={to}>
    {children}
  </Nav.Link>
);
