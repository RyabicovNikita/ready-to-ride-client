import { Link } from "react-router";
import "./Button.scss";
export const HeaderButton = ({ to, children }) => (
  <Link to={to} className="button">
    {children}
  </Link>
);
