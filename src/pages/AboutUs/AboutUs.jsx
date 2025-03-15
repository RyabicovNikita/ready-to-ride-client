import { MgContainer } from "../../components";
import "./AboutUs.scss";
import { ActionBlock } from "./components";
import aboutUsPassword from "./images/aboutUsPart1.png";
import aboutUsDown from "./images/aboutUsPart2.png";
import aboutUsFinish from "./images/aboutUsPart3.png";
import { useState } from "react";
const driverActions = [
  "Ищем поездку, предлагаем стоимость и отправляем на утверждение",
  "Ждём пока пассажир подтвердит стоимость и готовимся к поездке!",
];
const passActions = ["Создаём поездку", "Ждём пока водитель присоединится, утверждаем и готовимся к поездке!"];

export const AboutUs = () => {
  const [isDriverInfo, setIsDriverInfo] = useState(false);

  return (
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
          <div className="text-center mt-5">
            <h2 className="mb-3">Как это работает?</h2>
            <div className="btnInfo-container mb-5 d-flex gap-5 justify-content-center">
              <button
                onClick={() => setIsDriverInfo(false)}
                className={`aboutUs__btnInfo-pass btnInfo ${isDriverInfo ? "" : "active"}`}
              >
                Для пассажира
              </button>
              <button
                onClick={() => setIsDriverInfo(true)}
                className={`aboutUs__btnInfo-driver btnInfo ${isDriverInfo ? "active" : ""}`}
              >
                Для водителя
              </button>
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
              {isDriverInfo ? driverActions[0] : passActions[0]}
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
              {isDriverInfo ? driverActions[1] : passActions[1]}
            </ActionBlock>
          </div>
        </section>
        <section className="aboutUs__driver"></section>
      </div>
    </MgContainer>
  );
};
