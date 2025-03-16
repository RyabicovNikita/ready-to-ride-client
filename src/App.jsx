import "./App.css";
import { Header } from "./components/Header";

import { AuthModal, Footer } from "./components";
import { useLayoutEffect, useState } from "react";
import { USER_SESSION_KEY } from "./constants";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slice/index";
import { RoutesContainer } from "./routes";
import { AuthModalContext, PriceModalContext, UnconfirmedContext } from "./context";

function App() {
  const dispatch = useDispatch();
  const [authModalShow, setAuthModal] = useState(false);
  const [priceModalState, setPriceModalState] = useState(false);
  const [unconfirmedTrips, setUnconfirmedTrips] = useState([]);
  const [isRegister, setIsRegister] = useState(false);

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem(USER_SESSION_KEY);
    if (!currentUserDataJSON) return;
    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(setUser(currentUserData));
  }, []);
  const authModalHide = () => setAuthModal(false);
  const authModalView = () => setAuthModal(true);
  return (
    <div className="app">
      <UnconfirmedContext value={{ unconfirmedTrips: unconfirmedTrips, setUnconfirmedTrips: setUnconfirmedTrips }}>
        <AuthModalContext value={{ authModalView: authModalView, authModalHide: authModalHide }}>
          <Header setIsRegister={setIsRegister} />
          <AuthModal isRegister={isRegister} show={authModalShow} />
          <PriceModalContext value={{ priceModalState: priceModalState, setPriceModalState: setPriceModalState }}>
            <RoutesContainer />
          </PriceModalContext>
        </AuthModalContext>
      </UnconfirmedContext>
      <Footer />
    </div>
  );
}

export default App;
