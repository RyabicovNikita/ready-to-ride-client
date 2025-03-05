import { useEffect, useState } from "react";
import { getTripByID } from "../../api";
import { useParams } from "react-router";
import { Card } from "react-bootstrap";
import backgroundTripCard from "../../images/backgroundTripCard.jpg";
import { useError, useLoader } from "../../hooks";
import { Loader, MgContainer, TripCard } from "../../components";
import { useSelector } from "react-redux";
import { selectUser } from "../../store";

export const Trip = () => {
  const { error, resetError, handleError } = useError();
  const { loading, hideLoader, showLoader } = useLoader();
  const { id } = useParams();
  const [trip, setTrip] = useState({});
  const { id: userID } = useSelector(selectUser);
  useEffect(() => {
    showLoader();
    getTripByID(Number(id)).then((res) => {
      hideLoader();
      if (res.error) {
        handleError(res.error);
        return;
      }
      setTrip(res.body);
    });
  }, []);
  console.log(trip);
  return (
    <MgContainer>
      <Card className="bg-dark text-white mt-4">
        {loading && <Loader />}
        <Card.Img src={backgroundTripCard} alt="Card image" style={{ filter: "blur(5px)" }} />
        <Card.ImgOverlay style={{ backgroundColor: "rgba(157,157,157,0.48)" }}>
          <div className="trip">
            {loading && <Loader />}
            <div className="trip__background"></div>
            <div className="trip__container">
              <div className="trip__cities">
                <h1>Поездка</h1>
                <p>Москва</p>
                <p>Питер</p>
              </div>
            </div>
            <div className="trip__driver-card">
              <h2>Водитель</h2>
              <div className="trip__userName">{trip?.driver?.userName ?? "Пока не найден"}</div>
            </div>
            <div className="trip__passengers-card">
              <h2>Пассажиры</h2>
              <div className="trip__userName">{trip?.creator?.userName}</div>
              <h3>Число пассажиров</h3>
              <div className="trip__peoples">{trip.passengersNumber}</div>
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>
    </MgContainer>
  );
};
