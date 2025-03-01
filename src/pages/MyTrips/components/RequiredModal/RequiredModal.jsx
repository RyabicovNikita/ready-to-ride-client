import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UnconfirmedContext } from "../../../../context";
import { useError, useLoader } from "../../../../hooks";
import { confirmDriver } from "../../../../api";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../store";
import { Loader } from "../../../../components";
import { LOCAL_TRIPS } from "../../../../constants";

export const RequiredModal = ({ isDisabled }) => {
  const { error, handleError } = useError();
  const { unconfirmedTrips, setUnconfirmedTrips } = useContext(UnconfirmedContext);
  const { loading, hideLoader, showLoader } = useLoader();
  const [show, setShow] = useState(false);
  const { id: userID } = useSelector(selectUser);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAccept = async () => {
    showLoader();
    const res = await confirmDriver(unconfirmedTrips, userID);
    hideLoader();
    handleClose();
    if (res.error) handleError(res);
    else {
      setUnconfirmedTrips([]);
      localStorage.removeItem(LOCAL_TRIPS);
    }
  };
  return (
    <div className="d-flex justify-content-center w-100">
      {error}
      {loading && <Loader />}
      {isDisabled && (
        <Button variant="primary w-25" onClick={handleShow}>
          Подтвердить
        </Button>
      )}

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Внимание</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="font-weight-bold">После подтверждения пассажиры увидят вас в своих поездках как водителя.</p>
          <p className="text-secondary text-decoration-underline">
            Отмена подтверждённой поездки будет влиять на ваш общий рейтинг.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            Понимаю
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
