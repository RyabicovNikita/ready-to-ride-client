import { Button } from "react-bootstrap";

export const ActionButtons = ({ setTripEdit, resetError }) => (
  <>
    <Button
      className="btn-danger"
      onClick={() => {
        resetError();
        setTripEdit(false);
      }}
    >
      Отменить
    </Button>
    <Button className="btn-success" type="submit">
      Сохранить
    </Button>
  </>
);
