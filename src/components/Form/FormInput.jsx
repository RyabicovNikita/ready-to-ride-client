import { Form } from "react-bootstrap";

export const FormInput = ({ key, className, error, children, type = "string", props, placeholder = "" }) => (
  <div className={className}>
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
