import { Header } from "./components/Header";
import { Route, Routes } from "react-router";
import { Main } from "./components/Main/Main";
import { AuthModal, Footer } from "./components";
import { useState } from "react";
// import { RoutesContainer } from "./routes";

function App() {
    const [modalShow, setModalShow] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    return (
        <div className="app">
            <Header setModalShow={setModalShow} setIsRegister={setIsRegister} />
            <AuthModal
                isRegister={isRegister}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
