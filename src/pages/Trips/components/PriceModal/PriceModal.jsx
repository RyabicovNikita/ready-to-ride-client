import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UnconfirmedContext } from "../../../../context";
import { useError, useLoader } from "../../../../hooks";
import { Loader } from "../../../../components";
import { LOCAL_TRIPS } from "../../../../constants";

export const PriceModal = ({ show, handleShow, handleClose, driverModalState, setDriverModalState }) => {
  const { error, handleError } = useError();
  const { unconfirmedTrips, setUnconfirmedTrips } = useContext(UnconfirmedContext);
  const { loading, hideLoader, showLoader } = useLoader();

  const handleAccept = () => {
    console.log(window.location.search);
    let tripIDs = localStorage.getItem(LOCAL_TRIPS);
    if (!tripIDs) {
      localStorage.setItem(LOCAL_TRIPS, JSON.stringify([id]));
    } else {
      tripIDs = JSON.parse(tripIDs);
      const currentTripIndex = tripIDs.findIndex((tripId) => tripId === id);
      if (currentTripIndex > -1) tripIDs.splice(currentTripIndex, 1);
      else tripIDs.push(id);
      localStorage.setItem(LOCAL_TRIPS, JSON.stringify(tripIDs));
    }
    setUnconfirmedTrips(tripIDs);
    handleClose();
  };
  return (
    <div className="d-flex justify-content-center w-100">
      {error}
      {loading && <Loader />}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Стоимость</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="driverPriceForm" action={handleAccept}>
            <p htmlFor="driverPrice">Введите своё предложение стоимости поездки</p>
            <input
              id="driverPrice"
              name="driverPrice"
              type="number"
              placeholder="0"
              value={driverModalState}
              onChange={({ target }) => setDriverModalState(target.value)}
              required
              min={1}
              // {...register("driverPrice", {
              //   onChange: resetError,
              // })}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
