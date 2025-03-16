import { FloatingLabel, FormSelect, InputGroup } from "react-bootstrap";

export const FormSelector = ({ children, props, options = [], className, error }) => (
  <InputGroup className={`mb-3 ${className}`}>
    <FloatingLabel label={children}>
      <FormSelect {...props} className={`${error ? "is-invalid" : ""} `}>
        {options.map((option) => (
          <option>{option}</option>
        ))}
      </FormSelect>
    </FloatingLabel>
  </InputGroup>
);
