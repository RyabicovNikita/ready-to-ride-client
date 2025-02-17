import backgroundImg from "./images/background.jpg";
import "./Main.scss";
import { MgContainer } from "../MgContainer";
export const Main = ({ margin }) => (
    <main className="main">
        <MgContainer>
            <img
                className="img-fluid"
                alt="Background"
                src={backgroundImg}
            ></img>
        </MgContainer>
    </main>
);
