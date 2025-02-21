import { DateTime } from "luxon";
import { CardFooter } from "react-bootstrap";

export const Footer = () => (
  <CardFooter className="d-flex justify-content-center align-items-center bg-light" style={{ height: "50px" }}>
    {`© ${DateTime.now().year} Ready to ride. Все права защищены.`}
  </CardFooter>
);
