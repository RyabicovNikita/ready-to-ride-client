import "./Header.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../Main/images/logo.jpg";
import ghostImg from "../Main/images/ghost.png";
import { MgContainer } from "../MgContainer";
import { NavBarItem } from "./components/DropDown";
import { NavLink } from "./components/DropDown/NavLink";

export const Header = ({ setModalShow, setIsRegister }) => {
    const onRegisterClick = () => {
        setIsRegister(true);
        setModalShow(true);
    };
    const onLoginClick = () => {
        setIsRegister(false);
        setModalShow(true);
    };
    return (
        <header className="header bg-light">
            <Navbar expand="lg" className="bg-body-tertiary">
                <MgContainer style={{ display: "flex" }}>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="100"
                            height="100"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="gap-5">
                            <NavLink to={"#"}>Главная</NavLink>
                            <NavLink to={"#"}>Мои поездки</NavLink>
                            <NavDropdown
                                title="Водитель"
                                id="basic-nav-dropdown"
                            >
                                <NavBarItem to={"#"}>
                                    Найти пассажиров
                                </NavBarItem>
                            </NavDropdown>
                            <NavDropdown
                                title="Пассажир"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Новая поездка
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Другие поездки
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse id="basic-navbar-nav pr-2">
                        <Nav className="align-items-center">
                            <Nav.Link href="#home">О нас</Nav.Link>
                            <div className="d-flex align-items-center m-3">
                                <img
                                    src={ghostImg}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top border border-dark rounded-circle p-1"
                                />
                                <NavDropdown
                                    title="Авторизация"
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item onClick={onLoginClick}>
                                        Войти
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={onRegisterClick}>
                                        Регистрация
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </MgContainer>
            </Navbar>
        </header>
    );
};
