import "./App.css";
import { Header } from "./components/Header";

import { AuthModal, Footer } from "./components";
import { useLayoutEffect, useState } from "react";
import { USER_SESSION_KEY } from "./constants";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slice/index";
import { RoutesContainer } from "./routes";
import { ModalContext, UnconfirmedContext } from "./context";

function App() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [unconfirmedTrips, setUnconfirmedTrips] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem(USER_SESSION_KEY);
    if (!currentUserDataJSON) return;
    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(setUser(currentUserData));
  }, []);
  const modalHide = () => setModalShow(false);
  const modalView = () => setModalShow(true);
  return (
    <ModalContext value={{ modalHide: modalHide, modalView: modalView }}>
      <div className="app">
        <UnconfirmedContext value={{ unconfirmedTrips: unconfirmedTrips, setUnconfirmedTrips: setUnconfirmedTrips }}>
          <Header setModalShow={setModalShow} setIsRegister={setIsRegister} />
          <AuthModal isRegister={isRegister} show={modalShow} onHide={() => setModalShow(false)} />
          <RoutesContainer />
        </UnconfirmedContext>
        <Footer />
      </div>
    </ModalContext>
  );
}

export default App;
