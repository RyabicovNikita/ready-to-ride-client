import { Button } from "react-bootstrap";
import { MgContainer } from "../../components";
import "./AboutUs.scss";
import { ActionBlock } from "./components";
import aboutUsPassword from "./images/aboutUsPart1.png";
import aboutUsDown from "./images/aboutUsPart2.png";
import aboutUsFinish from "./images/aboutUsPart3.png";
export const AboutUs = () => (
  <MgContainer style={{ height: "fit-content" }}>
    <div className="aboutUs">
      <section className="aboutUs__info">
        <h1 className="text-center">Давайте знакомиться</h1>
        <p className="text-center font-weight-bold">Мы RR (Ready to Ride) - платформа для поиска попутчиков.</p>
        <h2 className="text-center">В чём фишка?</h2>
        <div class="yin-yang-200">
          <span className="yin-yang__pass">Пассажир</span>
          <span className="yin-yang__driver">Водитель</span>
        </div>
        <div className="d-flex align-items-center justify-content-center gap-5">
          <div className="aboutUs__passTasks tasks">
            <h3>Пассажир</h3>
            <ul>
              <li>Полностью контролирует поездку от создания до старта</li>
              <li>Не ждёт появления поездки, а создаёт её самостоятельно</li>
            </ul>
          </div>
          <div className="aboutUs__driverTasks tasks">
            <h3>Водитель</h3>
            <ul>
              <li>Не дожидается пассажиров, а в онлайн режиме набирает их</li>
              <li>Корректирует стоимость поездки</li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <h2>Как это работает?</h2>
          <div className="mb-3 d-flex gap-5 justify-content-center">
            <Button className="bg-dark border-white">Для пассажира</Button>
            <Button className="bg-white border-dark text-dark">Для водителя</Button>
          </div>
        </div>
      </section>
      <section className="aboutUs__passenger">
        <div className="aboutUs__passenger-row">
          <ActionBlock
            styles={{
              borderTopRightRadius: "20px",
              borderTopLeftRadius: "20px",
              background: "linear-gradient(to right, black 50%, white 50%)",
            }}
          >
            Регистрируемся и входим в аккаунт
          </ActionBlock>
          <div>
            <img className="aboutUs__passenger-first-image" src={aboutUsPassword} alt="" />
          </div>
          <ActionBlock
            styles={{
              borderTopRightRadius: "20px",
              borderTopLeftRadius: "20px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Создаём поездку
          </ActionBlock>
        </div>
        <div className="aboutUs__passenger-row">
          <div></div>
          <div></div>
          <div className="aboutUs__passenger-down">
            <img className="aboutUs__passenger-down-image" src={aboutUsDown} alt="" />
          </div>
        </div>
        <div className="aboutUs__passenger-row">
          <div></div>
          <div>
            <img className="aboutUs__passenger-finish-image" src={aboutUsFinish} alt="" />
          </div>
          <ActionBlock
            styles={{
              borderBottomRightRadius: "20px",
              borderBottomLeftRadius: "20px",
            }}
          >
            Ждём пока водитель присоединится
          </ActionBlock>
        </div>
      </section>
      <section className="aboutUs__driver"></section>
    </div>
  </MgContainer>
);
