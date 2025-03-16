import * as yup from "yup";
import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { UnconfirmedContext } from "../../../../context";
import { Error } from "../../../../components";
import { LOCAL_TRIPS } from "../../../../constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePriceModalContext } from "../../../../hooks";

export const PriceModal = () => {
  const { setUnconfirmedTrips } = useContext(UnconfirmedContext);
  const { priceModalState: modalState, priceModalHide: hide } = usePriceModalContext();
  const handleAccept = ({ driverPrice }) => {
    let tripsArr = localStorage.getItem(LOCAL_TRIPS);
    if (tripsArr) tripsArr = JSON.parse(tripsArr);

    if (!tripsArr?.length) {
      localStorage.setItem(LOCAL_TRIPS, JSON.stringify([{ id: modalState.id, driverPrice: driverPrice }]));
    } else {
      if (!tripsArr) return;

      const tripIndex = tripsArr.findIndex((i) => i.id === modalState.id);

      if (tripIndex > -1) tripsArr.splice(tripIndex, 1);
      else tripsArr.push({ id: modalState.id, driverPrice: driverPrice });

      localStorage.setItem(LOCAL_TRIPS, JSON.stringify(tripsArr));
    }
    setUnconfirmedTrips((prevState) => [...prevState, { id: modalState.id, driverPrice: driverPrice }]);
    hide();
  };
  const handleCancel = () => {
    let tripsArr = localStorage.getItem(LOCAL_TRIPS);
    if (tripsArr) {
      tripsArr = JSON.parse(tripsArr);
      const tripIndex = tripsArr.findIndex((i) => i.id === modalState.id);
      if (tripIndex) tripsArr.splice(tripIndex, 1);
      localStorage.setItem(LOCAL_TRIPS, JSON.stringify(tripsArr));
    }
    setUnconfirmedTrips((prevState) => prevState.filter((i) => i.id !== modalState.id));
    hide();
  };
  const passengerPrice = Number(modalState?.passengerPrice);
  const shapeObject = {
    driverPrice: yup
      .number()
      .min(passengerPrice - passengerPrice * 0.3, "Стоимость не может быть меньше 30% от предложенной")
      .max(passengerPrice + passengerPrice * 0.3, "Стоимость не может превышать 30% от предложенной"),
  };

  const formSchema = yup.object().shape(shapeObject);

  const formParams = {
    defaulValues: {},
    resolver: yupResolver(formSchema),
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(formParams);

  return (
    <div className="d-flex justify-content-center w-100">
      <Modal show={!!modalState?.isActive} onHide={hide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Стоимость</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="driverPriceForm" onSubmit={handleSubmit(handleAccept)}>
            {errors?.driverPrice?.message && <Error> {errors?.driverPrice?.message}</Error>}
            <p htmlFor="driverPrice">Введите своё предложение стоимости поездки</p>
            <input
              id="driverPrice"
              name="driverPrice"
              type="number"
              placeholder="0"
              defaultValue={modalState?.passengerPrice}
              {...register("driverPrice", {
                onChange: reset,
              })}
            />
          </form>
          <Modal.Footer style={{ marginTop: "20px", color: "#046e1e" }}>
            Предложенная пассажиром цена: {modalState?.passengerPrice}
          </Modal.Footer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Отмена
          </Button>
          <Button variant="primary" type="submit" form="driverPriceForm">
            Отправить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
