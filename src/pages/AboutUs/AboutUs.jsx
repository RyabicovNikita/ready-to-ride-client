import "./AboutUs.scss";
import aboutUsPassword from "./images/aboutUsPassword.png";
export const AboutUs = () => (
  <div className="aboutUs">
    <section className="aboutUs__info">
      <h1>Давайте знакомиться</h1>
      <span>Мы RR (Ready to Ride) - платформа для поиска попутчиков.</span>
      <h2>В чём фишка?</h2>
      <h3>Пассажир</h3>
      <ul>
        <li>Полностью контролирует поездку от создания до старта</li>
        <li>Не ждёт появления поездки, а создаёт её самостоятельно</li>
      </ul>
      <h3>Водитель</h3>
      <ul>
        <li>Не дожидается пассажиров, а в онлайн режиме набирает их</li>
        <li>Корректирует стоимость поездки</li>
      </ul>
      <h2>Как это работает?</h2>
      <div>
        <button>Для пассажира</button>
        <button>Для водителя</button>
      </div>
    </section>
    <section className="aboutUs__passenger">
      <div className="aboutUs__passenger-row">
        <div>Регистрируемся и(или) входим в аккаунт</div>
        <div>
          <img href={aboutUsPassword} alt="" />
        </div>
        <div>Создаём поездку</div>
      </div>
      <div className="aboutUs__passenger-row">
        <div></div>
        <div></div>
        <div>
          <img href />
        </div>
      </div>
      <div className="aboutUs__passenger-row"></div>
    </section>
    <secion className="aboutUs__driver"></secion>
  </div>
);
