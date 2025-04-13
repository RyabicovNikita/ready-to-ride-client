import { Form } from "react-bootstrap";

export const FormInput = ({ id, className, error, children, type = "string", disabled, props, placeholder = "" }) => {
  const curError = error?.fields ? error?.fields?.includes(id) : error;
  return (
    <div className={className}>
      {children && <Form.Label htmlFor={id}>{children}</Form.Label>}
      <Form.Control
        className={`${curError ? "is-invalid" : ""}`}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};
