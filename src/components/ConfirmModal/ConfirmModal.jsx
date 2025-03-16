import { Button, Modal } from "react-bootstrap";

export const ConfirmModal = ({ data, show, modalHide }) => (
  <div className="d-flex justify-content-center w-100">
    <Modal show={show} onHide={modalHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span> {data.message}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={modalHide}>
          Отмена
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            data.onAccept();
            modalHide();
          }}
        >
          Ок
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
);
