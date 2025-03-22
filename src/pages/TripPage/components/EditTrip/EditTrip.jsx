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

const fieldsIsCorrected = (data) => {
  if (!data.fromWhere || data.fromWhere === CITIES[0])
    return { fields: ["fromWhere"], message: "Выберите откуда планируете выезжать" };
  if (!data.toWhere || data.toWhere === CITIES[0]) return { fields: ["toWhere"], message: "Выберите пункт назначения" };
  if (data.fromWhere === data.toWhere) return { fields: ["fromWhere", "toWhere"], message: "Выберите разные пункты" };
};

export const EditTrip = ({
  setTripEdit,
  headerColor,
  id,
  dispatch,
  checkTokenExpired,
  error,
  handleError,
  resetError,
}) => {
  const trip = useSelector(selectTrip);
  const [editData, setEditData] = useState(trip);
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
      <CardHeader headerColor={headerColor} trip={trip}>
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
      </CardHeader>
      <div className="trip__content">
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
