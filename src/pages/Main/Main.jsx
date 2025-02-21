import backgroundImg from "../../images/background.jpg";
import "./Main.scss";
import { MgContainer } from "../../components";
export const Main = ({ margin }) => (
  <main className="main">
    <MgContainer>
      <img className="img-fluid" alt="Background" src={backgroundImg}></img>
    </MgContainer>
  </main>
);
