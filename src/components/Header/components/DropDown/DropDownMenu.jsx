import "./DropDownMenu.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import ghostImg from "../../../../images/ghost.png";
import { Link } from "react-router";
import { getFullImageURL } from "../../../../mappers";

export const DropDownMenu = ({ user, onRegisterClick, onLoginClick, onLogoutClick }) => (
  <Navbar.Collapse id="basic-navbar-nav pr-2">
    <Nav className="align-items-center">
      <div className="d-flex align-items-center m-3 gap-1 dropdown-container">
        <img
          src={getFullImageURL(user.imageUrl) || ghostImg}
          alt="Иконка пользоватея"
          width="40"
          height="40"
          className="d-inline-block align-top border border-dark rounded-circle"
          style={{ objectFit: 'cover' }}
        />
        {user?.id ? (
          <NavDropdown title={user.userName} id="basic-nav-dropdown" className="position-relative">
            <NavDropdown.Item  className="button non-border "><Link className="text-decoration-none text-dark" to={`/account/${user.id}`}>Личный кабинет</Link></NavDropdown.Item>
            <NavDropdown.Item className="button non-border " onClick={onLogoutClick}>
              Выход
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <NavDropdown title="Авторизация" id="basic-nav-dropdown">
            <NavDropdown.Item className="button non-border" onClick={onLoginClick}>
              Войти
            </NavDropdown.Item>
            <NavDropdown.Item className="button non-border" onClick={onRegisterClick}>
              Регистрация
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </div>
    </Nav>
  </Navbar.Collapse>
);
