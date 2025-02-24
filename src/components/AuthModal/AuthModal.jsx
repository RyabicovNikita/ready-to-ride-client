import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";

import { useEffect } from "react";
import { USER_SESSION_KEY } from "../../constants";
import { setUser } from "../../store/slice";
import { useDispatch } from "react-redux";
import { authUser } from "../../api";
import { useError } from "../../hooks";
import { getFormParams } from "../../yup";

export const AuthModal = ({ show, onHide, isRegister }) => {
  const dispatch = useDispatch();
  const { error, handleError, resetError } = useError();

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
    onHide();
  };

  useEffect(() => {
    resetError();
    clearErrors();
  }, [show]);

  useEffect(() => {
    handleError(errors);
  }, [errors]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{isRegister ? "Регистрация" : "Авторизация"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <div class="alert alert-danger" role="alert">
            Заполните все обязательные поля
          </div>
        )}
        <Form className="needs-validation" onSubmit={handleSubmit(onSubmit)} novalidate>
          {isRegister && (
            <>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label htmlFor="firstName">Имя</Form.Label>
                <Form.Control
                  className={`${errors.firstName?.message ? "is-invalid" : ""}`}
                  id="firstName"
                  name="firstName"
                  type="firstName"
                  placeholder="Иван"
                  autoFocus
                  {...register("firstName", {
                    onChange: resetError,
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label htmlFor="lastName">Фамилия</Form.Label>
                <Form.Control
                  className={`${errors.lastName?.message ? "is-invalid" : ""}`}
                  id="lastName"
                  name="lastName"
                  type="lastName"
                  placeholder="Иванов"
                  autoFocus
                  {...register("lastName", {
                    onChange: resetError,
                  })}
                />
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className={`${errors.email?.message ? "is-invalid" : ""}`}
              name="email"
              type="email"
              placeholder="name@example.ru"
              autoFocus
              {...register("email", {
                onChange: resetError,
              })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              className={`${errors.password?.message ? "is-invalid" : ""}`}
              name="password"
              type="password"
              placeholder="*******"
              autoFocus
              {...register("password", {
                onChange: resetError,
              })}
            />
          </Form.Group>
          {isRegister && (
            <>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Повторите пароль</Form.Label>
                <Form.Control
                  className={`${errors.repeatPassword?.message ? "is-invalid" : ""}`}
                  name="repeatPassword"
                  type="password"
                  placeholder="*******"
                  autoFocus
                  {...register("repeatPassword", {
                    onChange: resetError,
                  })}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    name="isDriver"
                    id="flexCheckDefault"
                    autoFocus
                    {...register("isDriver", {
                      onChange: resetError,
                    })}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Я водитель
                  </label>
                </div>
              </Form.Group>
            </>
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Отмена
            </Button>
            <Button disabled={!!error} type="submit" variant="primary">
              {isRegister ? "Зарегистрироваться" : "Войти"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
