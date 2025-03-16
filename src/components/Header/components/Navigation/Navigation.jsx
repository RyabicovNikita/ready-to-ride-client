import { Navbar } from "react-bootstrap";
import { HeaderButton } from "../../../Button";
import { UserNavBar } from "./components";

export const Navigation = ({ user }) => (
  <Navbar.Collapse className="gap-3" id="basic-navbar-nav">
    <HeaderButton to={"/"}>Главная</HeaderButton>
    {user.id && <UserNavBar isDriver={user.isDriver} />}
    <HeaderButton to={"aboutUs"}>О нас</HeaderButton>
  </Navbar.Collapse>
);
