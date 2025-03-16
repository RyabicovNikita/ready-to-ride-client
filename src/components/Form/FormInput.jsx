import { Form } from "react-bootstrap";

export const FormInput = ({ key, error, children, type = "string", props, placeholder = "" }) => (
  <div className="mb-3">
    {children && <Form.Label htmlFor={key}>{children}</Form.Label>}
    <Form.Control
      className={`${error ? "is-invalid" : ""}`}
      id={key}
      name={key}
      type={type}
      placeholder={placeholder}
      {...props}
    />
  </div>
);
