import { Button } from "react-bootstrap";

export const ActionButtons = ({ setTripEdit }) => (
  <>
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
  </>
);
