import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { USER_SESSION_KEY } from "../../constants";
import { setUser } from "../../store/slice";
import { useDispatch } from "react-redux";
import { authUser } from "../../api";
import { useError } from "../../hooks";
import { getFormParams } from "../../utils/yup/formParams";
import { useNavigate } from "react-router";
import { Error } from "../Error";
import { AuthModalContext } from "../../context";
import { FormCheckbox, FormInput } from "../Form";
import { INPUT_NAMES } from "./constants";

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

  const getRegProps = (propName, resetError) => ({
    ...register(propName, {
      onChange: resetError,
    }),
  });

  const getError = (propName, errors) => errors?.[propName]?.message;

  return (
    <Modal show={show} onHide={authModalHide}>
      <Modal.Header>
        <Modal.Title>{isRegister ? "Регистрация" : "Авторизация"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Error>{error}</Error>}
        <Form className="needs-validation" onSubmit={handleSubmit(onSubmit)} novalidate>
          {isRegister && (
            <>
              <FormInput
                key={INPUT_NAMES.NAME}
                error={getError(INPUT_NAMES.NAME)}
                placeholder="Иван"
                props={getRegProps(INPUT_NAMES.NAME)}
              >
                Имя
              </FormInput>
              <FormInput
                key={INPUT_NAMES.SURNAME}
                error={getError(INPUT_NAMES.SURNAME)}
                placeholder="Иванов"
                props={getRegProps(INPUT_NAMES.SURNAME)}
              >
                Фамилия
              </FormInput>
            </>
          )}
          <FormInput
            key={INPUT_NAMES.EMAIL}
            error={getError(INPUT_NAMES.EMAIL)}
            placeholder="myEmail@example.ru"
            type="email"
            props={getRegProps(INPUT_NAMES.EMAIL)}
          >
            Email
          </FormInput>
          <FormInput
            key={INPUT_NAMES.PASSWORD}
            error={getError(INPUT_NAMES.PASSWORD)}
            placeholder="*******"
            props={getRegProps(INPUT_NAMES.PASSWORD)}
          >
            Пароль
          </FormInput>

          {isRegister && (
            <>
              <FormInput
                key={INPUT_NAMES.REPEAT_PASSWORD}
                error={getError(INPUT_NAMES.REPEAT_PASSWORD)}
                placeholder="*******"
                props={getRegProps(INPUT_NAMES.REPEAT_PASSWORD)}
              >
                Повторите пароль
              </FormInput>
              <FormCheckbox key={INPUT_NAMES.IS_DRIVER} props={getRegProps(INPUT_NAMES.IS_DRIVER)}>
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
