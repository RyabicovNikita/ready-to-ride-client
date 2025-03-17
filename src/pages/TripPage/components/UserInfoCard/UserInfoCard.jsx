import { DriverIcon } from "../../../../icons/DriverIcon";
import { PassengerIcon } from "../../../../icons/PassengerIcon";
import "./UserInfoCard.scss";
export const UserInfoCard = ({ userName, passengersNumber, userPrice, role }) => (
  <div className={`trip__userCard ${role}`}>
    <div className="trip__userCard-content">
      <div className="trip__userCard-name">
        {role === "driver" ? (
          <div title="Водитель">
            <DriverIcon />
          </div>
        ) : (
          <div title="Пассажир">
            <PassengerIcon />
          </div>
        )}
        <span className="trip__userCard-name">{userName}</span>
      </div>
      <p className="trip__userCard-price">Предлагаемая цена {userPrice} ₽</p>
    </div>
  </div>
);
