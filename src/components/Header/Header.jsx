import "./Header.scss";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../../images/logo.png";
import ghostImg from "../../images/ghost.png";

import { NavBarItem } from "./components/DropDown";
import { NavLink } from "./components/DropDown/NavLink";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/selectors";
import { logoutUserFromStore } from "../../store/slice";
import { logoutUser } from "../../api";
import { LOCAL_TRIPS, USER_SESSION_KEY } from "../../constants";
import { MgContainer } from "../../core/UI";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { UnconfirmedContext } from "../../context";

export const Header = ({ setAuthModal, setIsRegister }) => {
  const { unconfirmedTrips, setUnconfirmedTrips } = useContext(UnconfirmedContext);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onRegisterClick = () => {
    setIsRegister(true);
    setAuthModal(true);
  };
  const onLoginClick = () => {
    setIsRegister(false);
    setAuthModal(true);
  };
  const onLogoutClick = async () => {
    await logoutUser();
    dispatch(logoutUserFromStore());
    sessionStorage.removeItem(USER_SESSION_KEY);
    localStorage.removeItem(LOCAL_TRIPS);
    setUnconfirmedTrips([]);
    navigate("/");
  };

  useEffect(() => {
    let trips = localStorage.getItem(LOCAL_TRIPS);
    if (trips) trips = JSON.parse(trips);
    console.log(trips);
    if (trips?.length > 0) setUnconfirmedTrips(trips);
  }, []);
  return (
    <header className="header bg-light">
      <Navbar expand="lg" className="bg-body-tertiary">
        <MgContainer style={{ display: "flex" }}>
          <Navbar.Brand href="/">
            <img alt="" src={logo} width="60" height="auto" className="header__logo d-inline-block align-top b" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavBarItem to={"/"}>Главная</NavBarItem>
            {user.id && (
              <>
                {user.isDriver && (
                  <div className="position-relative">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                      {unconfirmedTrips?.length ?? 0}
                      <span class="visually-hidden">На подтверждении</span>
                    </span>
                    <NavBarItem to={window.location.origin + "/trips/unconfirmed"}>На подтверждении</NavBarItem>
                  </div>
                )}
                <NavBarItem to={window.location.origin + "/trips"}>Поездки</NavBarItem>
                {!user.isDriver && (
                  <NavLink to={"trips/new"}>
                    <div className="btn btn-dark w-100">Новая поездка</div>
                  </NavLink>
                )}
              </>
            )}
            <NavBarItem to={"aboutUs"}>О нас</NavBarItem>
          </Navbar.Collapse>
          <Navbar.Collapse id="basic-navbar-nav pr-2">
            <Nav className="align-items-center">
              <div className="d-flex align-items-center m-3">
                <img
                  src={ghostImg}
                  width="30"
                  height="30"
                  className="d-inline-block align-top border border-dark rounded-circle p-1"
                />
                {user?.id ? (
                  <NavDropdown title={user.userName} id="basic-nav-dropdown" className="position-relative">
                    <NavDropdown.Item>Личный кабинет</NavDropdown.Item>
                    <NavDropdown.Item onClick={onLogoutClick}>Выход</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavDropdown title="Авторизация" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={onLoginClick}>Войти</NavDropdown.Item>
                    <NavDropdown.Item onClick={onRegisterClick}>Регистрация</NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </MgContainer>
      </Navbar>
    </header>
  );
};
