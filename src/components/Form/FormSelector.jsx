import { FloatingLabel, FormSelect, InputGroup } from "react-bootstrap";

export const FormSelector = ({ id, children, props, options = [], className, error }) => {
  const curError = error?.fields ? error?.fields?.includes(id) : error;
  return (
    <InputGroup className={`mb-3 ${className}`}>
      <FloatingLabel label={children}>
        <FormSelect {...props} className={`${curError ? "is-invalid" : ""} `}>
          {options.map((option) => (
            <option>{option}</option>
          ))}
        </FormSelect>
      </FloatingLabel>
    </InputGroup>
  );
};
