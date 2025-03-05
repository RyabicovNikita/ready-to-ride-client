import { useEffect, useState } from "react";
import { getTripByID } from "../../api";
import { useParams } from "react-router";
import { Card, Col, Container, Row } from "react-bootstrap";
import backgroundTripCard from "../../images/backgroundTripCard.jpg";
import { useError, useLoader } from "../../hooks";
import { Loader, MgContainer, TripCard } from "../../components";
import { useSelector } from "react-redux";
import { selectUser } from "../../store";
import { CITIES } from "../../constants";
import "./Trip.scss";
import { UserInfoCard } from "./components";
import carSeatIcon from "../../icons/car-seat.png";

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
        setTrip({
            fromWhere: CITIES[2],
            toWhere: CITIES[3],
            seatsCar: 3,
            driver: {
                userName: "Григорий Лепс",
                price: 1000,
            },
            creator: {
                id: 1,
                userName: "Иванов Иван",
                price: 2500,
            },
            passengersNumber: 3,
            totalPrice: 2000,
            status: "Новая",
        });
    }, []);

    return (
        <MgContainer
            style={{
                placeItems: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
            }}
        >
            <Container className="trip">
                {loading && <Loader />}
                <div className="trip__header">
                    <span>{trip.status}</span>
                </div>
                <div className="trip__container">
                    <div className="trip__cities">
                        <span>{trip.fromWhere}</span>
                        <i class="bi bi-arrow-right"></i>
                        <span>{trip.toWhere}</span>
                    </div>
                </div>
                <div className="trip__content">
                    <UserInfoCard
                        userName={trip?.driver?.userName}
                        userPrice={trip?.driver?.price}
                        role={"driver"}
                    />
                    <UserInfoCard
                        userName={trip?.creator?.userName}
                        passengersNumber={trip.passengersNumber}
                        userPrice={trip?.creator?.price}
                        role={"passenger"}
                    />
                </div>
                <div className="trip__footer">
                    <div className="trip__footer-count">
                        <div className="trip__footer-seats-count">
                            <img
                                className="trip__footer-seats-icon"
                                src={carSeatIcon}
                                alt="Кол-во мест у водителя"
                            />
                            <span> {trip.seatsCar}</span>
                        </div>
                        <span>/</span>
                        <div className="trip__footer-pass-count">
                            <span>{trip.passengersNumber}</span>
                            <i class="bi bi-people-fill"></i>
                        </div>
                    </div>

                    <span className="trip__footer-totalPrice">
                        {trip.totalPrice} ₽
                    </span>
                </div>
            </Container>
        </MgContainer>
    );
};
