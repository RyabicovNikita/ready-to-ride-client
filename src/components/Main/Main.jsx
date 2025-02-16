import { Image } from "react-bootstrap";
import backgroundImg from "./images/background.jpg";
import "./Main.scss";
import { MgContainer } from "../MgContainer";
export const Main = ({ margin }) => (
  <main className="main">
    <MgContainer href={backgroundImg}></MgContainer>
  </main>
);
