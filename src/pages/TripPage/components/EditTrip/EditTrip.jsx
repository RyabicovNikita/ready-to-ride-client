import "../MainTrip/Trip.scss";
import "./EditTrip.scss";
import { Container } from "react-bootstrap";
import { updateTrip } from "../../../../api";
import { useError, useLoader } from "../../../../hooks";
import { FormInput, FormSelector, Loader, MgContainer } from "../../../../components";
import { UserInfoCard } from "../UserInfoCard";
import { CITIES, TRIP_PROPS } from "../../../../constants";
import { PassIcon } from "../Icons";
import { logoutUserIfTokenExpired, renderError } from "../../../../utils";
import { useCallback, useState } from "react";
import { CardHeader } from "../CardHeader";
import { RightArrow } from "./../../../../icons/RightArrow";
import { TripPeoples } from "../TripPeoples";
import { ActionButtons } from "./components";
import { redGetTrip } from "../../../../store";

const fieldsIsCorrected = (trip) => {
  if (!trip.fromWhere || trip.fromWhere === CITIES[0]) return "Выберите откуда планируете выезжать";
  if (!trip.toWhere || trip.toWhere === CITIES[0]) return "Выберите пункт назначения";
  if (trip.fromWhere === trip.toWhere) return "Выберите разные пункты";
};

export const EditTrip = ({ setTripEdit, trip, headerColor, id, authModalView, prePrice, navigate, dispatch }) => {
  const [editData, setEditData] = useState(trip);
  const { error, resetError, handleError } = useError();
  const { loading } = useLoader();
  const checkTokenExpired = useCallback(
    (error) => logoutUserIfTokenExpired({ error, handleError, dispatch, navigate, authModalView, resetError }),
    []
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const error = fieldsIsCorrected(trip);
    if (error) {
      handleError(error);
      return;
    }

    const res = await updateTrip({
      fromWhere: editData.fromWhere,
      toWhere: editData.toWhere,
      numberPeople: editData.passengersNumber,
      passengerPrice: editData.creator.price,
      tripID: id,
    });

    if (res.error) {
      checkTokenExpired(res.error);
      return;
    }
    dispatch(redGetTrip(res.body));
    setTripEdit(false);
  };

  const onInputChange = (propName, newValue) => {
    resetError();

    setEditData((prevState) => ({ ...prevState, [propName]: newValue }));
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
            <CardHeader headerColor={headerColor} trip={trip}>
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
              <RightArrow />
              <FormSelector
                key={TRIP_PROPS.TO}
                error={error}
                options={CITIES}
                props={{ value: trip?.toWhere, onChange: ({ target }) => onInputChange("toWhere", target.value) }}
              >
                Куда
              </FormSelector>
            </CardHeader>
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
                        setEditData((prevState) => ({
                          ...prevState,
                          creator: { ...prevState.creator, price: Number(target.value) },
                        }));
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            {renderError(error)}
            <div className="trip__footer">
              <TripPeoples>
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
              </TripPeoples>
              <ActionButtons setTripEdit={setTripEdit} />
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
