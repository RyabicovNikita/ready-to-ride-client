import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useCallback, useContext, useEffect } from "react";
import { USER_PROPS, USER_SESSION_KEY } from "../../constants";
import { setUser } from "../../store/slice";
import { useDispatch } from "react-redux";
import { authUser } from "../../api";
import { useError } from "../../hooks";
import { getFormParams } from "../../utils/yup/formParams";
import { useNavigate } from "react-router";
import { AuthModalContext } from "../../context";
import { FormCheckbox, FormInput } from "../Form";
import { getError } from "../../utils/yup";
import { renderError } from "../../utils";

export const AuthModal = ({ show, isRegister }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, handleError, resetError } = useError();
  const { authModalHide } = useContext(AuthModalContext);
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm(getFormParams(isRegister));

  const onSubmit = async ({ email, password, firstName, lastName, isDriver }) => {
    const { error = "", body: user = null } = await authUser(isRegister, {
      email,
      password,
      firstName,
      lastName,
      isDriver,
    });
    if (error) {
      handleError(error);
      return;
    }
    sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    dispatch(setUser(user));
    reset();
    authModalHide();
    navigate(-1);
  };

  useEffect(() => {
    resetError();
    clearErrors();
  }, [show]);

  useEffect(() => {
    handleError(errors);
  }, [errors]);

  const getRegProps = (propName) => ({
    ...register(propName, {
      onChange: resetError,
    }),
  });

  const getErrorByProp = useCallback((propName) => getError(propName, errors), [errors]);

  return (
    <Modal show={show} onHide={authModalHide}>
      <Modal.Header>
        <Modal.Title>{isRegister ? "Регистрация" : "Авторизация"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderError(error)}
        <Form className="needs-validation" onSubmit={handleSubmit(onSubmit)} novalidate>
          {isRegister && (
            <>
              <FormInput
                className={"mb-3"}
                key={USER_PROPS.NAME}
                error={getErrorByProp(USER_PROPS.NAME)}
                placeholder="Иван"
                props={getRegProps(USER_PROPS.NAME)}
              >
                Имя
              </FormInput>
              <FormInput
                className={"mb-3"}
                key={USER_PROPS.SURNAME}
                error={getErrorByProp(USER_PROPS.SURNAME)}
                placeholder="Иванов"
                props={getRegProps(USER_PROPS.SURNAME)}
              >
                Фамилия
              </FormInput>
            </>
          )}
          <FormInput
            className={"mb-3"}
            key={USER_PROPS.EMAIL}
            error={getErrorByProp(USER_PROPS.EMAIL)}
            placeholder="myEmail@example.ru"
            type="email"
            props={getRegProps(USER_PROPS.EMAIL)}
          >
            Email
          </FormInput>
          <FormInput
            className={"mb-3"}
            key={USER_PROPS.PASSWORD}
            error={getErrorByProp(USER_PROPS.PASSWORD)}
            type="password"
            placeholder="*******"
            props={getRegProps(USER_PROPS.PASSWORD)}
          >
            Пароль
          </FormInput>

          {isRegister && (
            <>
              <FormInput
                className={"mb-3"}
                key={USER_PROPS.REPEAT_PASSWORD}
                error={getErrorByProp(USER_PROPS.REPEAT_PASSWORD)}
                placeholder="*******"
                type="password"
                props={getRegProps(USER_PROPS.REPEAT_PASSWORD)}
              >
                Повторите пароль
              </FormInput>
              <FormCheckbox key={USER_PROPS.IS_DRIVER} props={getRegProps(USER_PROPS.IS_DRIVER)}>
                Я водитель
              </FormCheckbox>
            </>
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={authModalHide}>
              Отмена
            </Button>
            <Button className="bg-dark border-dark" disabled={!!error} type="submit" variant="primary">
              {isRegister ? "Зарегистрироваться" : "Войти"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
