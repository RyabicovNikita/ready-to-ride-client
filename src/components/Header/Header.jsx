import "./Header.scss";
import { Navbar } from "react-bootstrap";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/selectors";
import { logoutUserFromStore } from "../../store/slice";
import { logoutUser } from "../../api";
import { LOCAL_TRIPS, USER_SESSION_KEY } from "../../constants";
import { MgContainer } from "../../core/UI";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { AuthModalContext, UnconfirmedContext } from "../../context";
import { DropDownMenu, Navigation } from "./components";

export const Header = ({ setIsRegister }) => {
  const { setUnconfirmedTrips } = useContext(UnconfirmedContext);
  const { authModalView } = useContext(AuthModalContext);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onRegisterClick = () => {
    setIsRegister(true);
    authModalView();
  };
  const onLoginClick = () => {
    setIsRegister(false);
    authModalView();
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

    if (trips?.length > 0) setUnconfirmedTrips(trips);
  }, []);

  return (
    <header className="header">
      <Navbar expand="lg" className="bg-body-tertiary">
        <MgContainer style={{ display: "flex", gap: "20px" }}>
          <Navbar.Brand href="/">
            <img alt="" src={logo} width="60" height="auto" className="header__logo d-inline-block align-top" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navigation user={user} />
          <DropDownMenu
            user={user}
            onRegisterClick={onRegisterClick}
            onLoginClick={onLoginClick}
            onLogoutClick={onLogoutClick}
          />
        </MgContainer>
      </Navbar>
    </header>
  );
};
