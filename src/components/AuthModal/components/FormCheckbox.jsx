export const FormCheckbox = ({ key, props, children }) => (
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" name={key} id="flexCheckDefault" autoFocus {...props} />
    <label class="form-check-label" for="flexCheckDefault">
      {children}
    </label>
  </div>
);
