import { Header } from "./components/Header";

import { AuthModal, Footer } from "./components";
import { useLayoutEffect, useState } from "react";
import { USER_SESSION_KEY } from "./constants";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slice/index";
import { RoutesContainer } from "./routes";

function App() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem(USER_SESSION_KEY);
    if (!currentUserDataJSON) return;
    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(setUser(currentUserData));
  }, []);
  return (
    <div className="app">
      <Header setModalShow={setModalShow} setIsRegister={setIsRegister} />
      <AuthModal isRegister={isRegister} show={modalShow} onHide={() => setModalShow(false)} />
      <RoutesContainer />
      <Footer />
    </div>
  );
}

export default App;
