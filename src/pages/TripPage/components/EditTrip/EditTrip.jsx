import "../MainTrip/Trip.scss";
import "./EditTrip.scss";
import { updateTrip } from "../../../../api";
import { FormInput, FormSelector } from "../../../../components";
import { UserInfoCard } from "../UserInfoCard";
import { CITIES, TRIP_PROPS } from "../../../../constants";
import { PassIcon } from "../Icons";
import { getTripPrePrice, renderError } from "../../../../utils";
import { useMemo, useState } from "react";
import { CardHeader } from "../CardHeader";
import { RightArrow } from "./../../../../icons/RightArrow";
import { TripPeoples } from "../TripPeoples";
import { ActionButtons } from "./components";
import { redGetTrip, selectTrip } from "../../../../store";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import { convertToDatetimeLocal } from "../../../../formatters/formatDate";

const fieldsIsCorrected = (data) => {
  if (!data.fromWhere || data.fromWhere === CITIES[0])
    return { fields: ["fromWhere"], message: "Выберите откуда планируете выезжать" };
  if (!data.toWhere || data.toWhere === CITIES[0]) return { fields: ["toWhere"], message: "Выберите пункт назначения" };
  if (data.fromWhere === data.toWhere) return { fields: ["fromWhere", "toWhere"], message: "Выберите разные пункты" };
};

export const EditTrip = ({ setTripEdit, id, dispatch, checkTokenExpired, error, handleError, resetError }) => {
  const trip = useSelector(selectTrip);
  const [editData, setEditData] = useState({
    ...(trip ?? {}),
    datetime: convertToDatetimeLocal(trip.dateTravel, trip.timeTravel),
  });
  const prePrice = useMemo(() => getTripPrePrice(editData?.driver?.price, editData?.creator?.price), [editData]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const error = fieldsIsCorrected(editData);

    if (error) {
      handleError(error);
      return;
    }

    const res = await updateTrip({
      fromWhere: editData.fromWhere,
      toWhere: editData.toWhere,
      numberPeople: editData.passengersNumber,
      passengerPrice: editData.creator.price,
      datetime: editData.datetime,
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
  console.log(trip);
  return (
    <form onSubmit={onSubmit} className="editTrip container">
      <CardHeader status={trip.status} statusColor={trip.statusColor} />
      <div className="trip__travel">
        <div className="d-flex gap-3">
          <FormSelector
            id={TRIP_PROPS.FROM}
            key={TRIP_PROPS.FROM}
            error={error}
            options={CITIES}
            props={{
              value: editData?.fromWhere,
              onChange: ({ target }) => onInputChange("fromWhere", target.value),
            }}
          >
            Откуда
          </FormSelector>
          <RightArrow />
          <FormSelector
            id={TRIP_PROPS.TO}
            key={TRIP_PROPS.TO}
            error={error}
            options={CITIES}
            props={{ value: editData?.toWhere, onChange: ({ target }) => onInputChange("toWhere", target.value) }}
          >
            Куда
          </FormSelector>
        </div>

        <div className="trip__travel-datetime">
          <FormInput
            id={TRIP_PROPS.WHEN}
            key={TRIP_PROPS.WHEN}
            error={error}
            type="datetime-local"
            props={{
              min: DateTime.now().plus({ hours: 0.5 }).toFormat("yyyy-MM-dd'T'T").toString(),
              max: DateTime.now().plus({ years: 1 }).toFormat("yyyy-MM-dd'T'T").toString(),
              defaultValue: editData.datetime,
              onChange: ({ target }) => onInputChange("datetime", target.value),
            }}
          />
        </div>
      </div>
      <div className="trip__participants">
        <UserInfoCard
          userName={editData?.driver?.userName ?? "Пока не найден"}
          userPrice={editData?.driver?.price}
          role={"driver"}
        />
        <div className="trip__userCard-content">
          <div className="trip__userCard-name">
            <PassIcon />
            <span className="trip__userCard-name">{editData?.creator?.userName}</span>
          </div>
          <div className="trip__userCard-price">
            <span> Предлагаемая цена</span>
            <FormInput
              id={TRIP_PROPS.PASS_PRICE}
              key={TRIP_PROPS.PASS_PRICE}
              error={error}
              type="number"
              props={{
                min: 1,
                max: 99999,
                defaultValue: editData?.creator?.price,
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
            error={error}
            type="number"
            props={{
              min: 1,
              max: 20,
              defaultValue: editData?.passengersNumber,
              onChange: ({ target }) => onInputChange("passengersNumber", Number(target.value)),
            }}
          />
        </TripPeoples>
        <ActionButtons setTripEdit={setTripEdit} resetError={resetError} />
        <div className="trip__footer-totalPrice">
          <div className="trip__footer-totalPrice-container">
            <div className="d-flex flex-column align-items-end">
              <span>Стоимость в обсуждении...</span>
              <span className="trip__userCard-price prePrice">Предварительно {prePrice} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
