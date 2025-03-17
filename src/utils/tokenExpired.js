import { Error } from "../components";
import { USER_SESSION_KEY } from "../constants";
import { logoutUserFromStore } from "../store";

export const renderError = (error) =>
  error && (
    <Error>
      {error === "jwt expired"
        ? "Ваш сеанс устарел, перенаправление на страницу авторизации..."
        : error?.message ?? error?.error ?? error}
    </Error>
  );

export const logoutUserIfTokenExpired = ({ error, handleError, dispatch, navigate, authModalView, resetError }) => {
  handleError(error);
  if (error !== "jwt expired") return false;
  let timeOutID;
  sessionStorage.removeItem(USER_SESSION_KEY);
  dispatch(logoutUserFromStore());
  if (timeOutID) clearTimeout(timeOutID);
  timeOutID = setTimeout(() => {
    navigate("/login");
    authModalView();
    resetError();
  }, 3000);
  return true;
};
