import "../Trip/Trip.scss";
import "./EditTrip.scss";
import { useEffect, useMemo, useState } from "react";
import { getTripByID, updateTrip } from "../../api";
import { useNavigate, useParams } from "react-router";
import { Button, Container } from "react-bootstrap";
import { useError, useLoader } from "../../hooks";
import { Error, Loader, MgContainer } from "../../components";
import { UserInfoCard } from "../Trip/components";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserFromStore, selectUser } from "../../store";

import { CITIES, TRIP_STATUSES, USER_SESSION_KEY } from "../../constants";
import { getTripPrePrice } from "../../utils";

export const EditTrip = ({ authModalView, setTripEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [headerColor, setHeaderColor] = useState("white");

  const { error, resetError, handleError } = useError();
  const { loading, hideLoader, showLoader } = useLoader();
  let { id } = useParams();
  id = Number(id);
  const [trip, setTrip] = useState({});
  const { id: userID, isDriver } = useSelector(selectUser);

  const prePrice = useMemo(() => getTripPrePrice(trip), [trip]);

  useEffect(() => {
    showLoader();
    getTripByID(id).then((res) => {
      hideLoader();
      if (res.error) {
        let timeOutID;
        handleError(res.error);
        if (res.error === "jwt expired") {
          sessionStorage.removeItem(USER_SESSION_KEY);
          dispatch(logoutUserFromStore());
          if (timeOutID) clearTimeout(timeOutID);
          timeOutID = setTimeout(() => {
            navigate("/login");
            authModalView();
            resetError();
          }, 3000);
        }
        return;
      }
      setTrip(res.body);
    });
  }, []);

  const updateHeaderColor = () => {
    if (!trip.status) return;
    const status = Object.values(TRIP_STATUSES).find((status) => status.text === trip.status);

    setHeaderColor(status?.color ?? "white");
  };

  useEffect(() => {
    updateHeaderColor();
  }, [trip.status]);

  const fieldsIsCorrected = (trip) => {
    if (!trip.fromWhere || trip.fromWhere === CITIES[0]) return "Выберите откуда планируете выезжать";
    if (!trip.toWhere || trip.toWhere === CITIES[0]) return "Выберите пункт назначения";
    if (trip.fromWhere === trip.toWhere) return "Выберите разные пункты";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const error = fieldsIsCorrected(trip);
    if (error) {
      handleError(error);
      return;
    }

    const res = await updateTrip({
      fromWhere: trip.fromWhere,
      toWhere: trip.toWhere,
      numberPeople: trip.passengersNumber,
      passengerPrice: trip.creator.price,
      tripID: id,
    });

    if (res.error) {
      handleError(res.error);
      return;
    }
    setTripEdit(false);
  };

  const onInputChange = (propName, newValue) => {
    resetError();

    setTrip((prevState) => ({ ...prevState, [propName]: newValue }));
  };

  return (
    <form onSubmit={onSubmit} className="editTrip">
      {loading && <Loader />}
      <MgContainer
        style={{
          placeItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Container className="trip" style={{ filter: `blur(${loading ? "10px" : "0"})` }}>
          <>
            <div className="trip__header " style={{ backgroundColor: headerColor }}>
              <div className="d-flex h-100 align-items-center">{trip.status}</div>
              <div className="trip__container">
                <div className="trip__cities">
                  <div class="mb-3">
                    <select
                      id="from-selector"
                      className="form-select form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-default"
                      value={trip?.fromWhere}
                      onChange={({ target }) => onInputChange("fromWhere", target.value)}
                    >
                      {CITIES.map((city) => (
                        <option>{city}</option>
                      ))}
                    </select>
                  </div>
                  <i class="bi bi-arrow-right"></i>
                  <select
                    id="from-selector"
                    className="form-select form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    value={trip?.toWhere}
                    onChange={({ target }) => onInputChange("toWhere", target.value)}
                  >
                    {CITIES.map((city) => (
                      <option>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="trip__content">
              <UserInfoCard
                userName={trip?.driver?.userName ?? "Пока не найден"}
                userPrice={trip?.driver?.price}
                role={"driver"}
              />
              <div className="trip__userCard-content">
                <div className="trip__userCard-name">
                  {
                    <div title="Пассажир">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-person-raised-hand"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a1 1 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207" />
                        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                      </svg>
                    </div>
                  }
                  <span className="trip__userCard-name">{trip?.creator?.userName}</span>
                </div>

                <div className="trip__userCard-price">
                  <span> Предлагаемая цена</span>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    value={Number(trip?.creator?.price)}
                    min={1}
                    max={99999}
                    onChange={({ target }) => {
                      resetError();
                      setTrip((prevState) => ({
                        ...prevState,
                        creator: { ...prevState.creator, price: Number(target.value) },
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
            {error && (
              <Error>
                {error === "jwt expired"
                  ? "Ваш сеанс устарел, перенаправление на страницу авторизации..."
                  : error?.message ?? error?.error ?? error}
              </Error>
            )}
            <div className="trip__footer">
              <div className="trip__footer-count">
                <div className="trip__footer-pass-count">
                  <input
                    type="number"
                    class="form-control w-50"
                    id="exampleFormControlInput1"
                    value={trip.passengersNumber}
                    min={1}
                    max={99999}
                    onChange={({ target }) => onInputChange("passengersNumber", Number(target.value))}
                  />
                  <i class="bi bi-people-fill"></i>
                </div>
              </div>
              <Button
                className="btn-danger"
                onClick={() => {
                  setTripEdit(false);
                }}
              >
                Отменить
              </Button>
              <Button className="btn-success" type="submit">
                Сохранить
              </Button>
              <div className="trip__footer-totalPrice">
                <div className="trip__footer-totalPrice-container">
                  <div className="d-flex flex-column align-items-end">
                    <span>Стоимость в обсуждении...</span>
                    <span className="trip__userCard-price prePrice">Предварительно {prePrice} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Container>
      </MgContainer>
    </form>
  );
};
