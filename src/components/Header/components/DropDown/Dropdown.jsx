import { Dropdown } from "react-bootstrap";

export const DropdownMenu = ({ text, children }) => (
  <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      {text}
    </Dropdown.Toggle>

    <Dropdown.Menu>{children}</Dropdown.Menu>
  </Dropdown>
);
