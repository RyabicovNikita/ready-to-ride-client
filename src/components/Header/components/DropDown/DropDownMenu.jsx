import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import ghostImg from "../../../../images/ghost.png";

export const DropDownMenu = ({ user, onRegisterClick, onLoginClick, onLogoutClick }) => (
  <Navbar.Collapse id="basic-navbar-nav pr-2">
    <Nav className="align-items-center">
      <div className="d-flex align-items-center m-3">
        <img
          src={ghostImg}
          alt="Иконка пользоватея"
          width="30"
          height="30"
          className="d-inline-block align-top border border-dark rounded-circle p-1"
        />
        {user?.id ? (
          <NavDropdown title={user.userName} id="basic-nav-dropdown" className="position-relative">
            <NavDropdown.Item className="button non-border">Личный кабинет</NavDropdown.Item>
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
