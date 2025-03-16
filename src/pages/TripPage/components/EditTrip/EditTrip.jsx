import "../MainTrip/Trip.scss";
import "./EditTrip.scss";
import { Button, Container } from "react-bootstrap";
import { updateTrip } from "../../../../api";
import { useError, useLoader } from "../../../../hooks";
import { Error, FormInput, FormSelector, Loader, MgContainer } from "../../../../components";
import { UserInfoCard } from "../UserInfoCard";
import { CITIES, TRIP_PROPS, USER_SESSION_KEY } from "../../../../constants";
import { PassIcon } from "../Icons";
import { logoutUserFromStore } from "../../../../store";

export const EditTrip = ({
  setTripEdit,
  trip,
  setTrip,
  headerColor,
  id,
  authModalView,
  prePrice,
  navigate,
  dispatch,
}) => {
  const { error, resetError, handleError } = useError();
  const { loading } = useLoader();

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
      if (res.error === "jwt expired") {
        let timeOutID;
        handleError(res.error);
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
                  <FormSelector
                    key={TRIP_PROPS.FROM}
                    error={error}
                    options={CITIES}
                    props={{
                      value: trip?.fromWhere,
                      onChange: ({ target }) => onInputChange("fromWhere", target.value),
                    }}
                  >
                    Откуда
                  </FormSelector>
                  <i class="bi bi-arrow-right"></i>
                  <FormSelector
                    key={TRIP_PROPS.TO}
                    error={error}
                    options={CITIES}
                    props={{ value: trip?.toWhere, onChange: ({ target }) => onInputChange("toWhere", target.value) }}
                  >
                    Куда
                  </FormSelector>
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
                  <PassIcon />
                  <span className="trip__userCard-name">{trip?.creator?.userName}</span>
                </div>
                <div className="trip__userCard-price">
                  <span> Предлагаемая цена</span>
                  <FormInput
                    key={TRIP_PROPS.PASS_PRICE}
                    error={error}
                    type="number"
                    props={{
                      min: 1,
                      max: 99999,
                      defaultValue: trip?.creator?.price,
                      onChange: ({ target }) => {
                        resetError();
                        setTrip((prevState) => ({
                          ...prevState,
                          creator: { ...prevState.creator, price: Number(target.value) },
                        }));
                      },
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
                  <FormInput
                    key={TRIP_PROPS.PEOPLES}
                    type="number"
                    props={{
                      min: 1,
                      max: 20,
                      defaultValue: trip?.passengersNumber,
                      onChange: ({ target }) => onInputChange("passengersNumber", Number(target.value)),
                    }}
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
