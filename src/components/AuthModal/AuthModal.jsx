import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { getFormParams } from "./yup";
import { useEffect, useState } from "react";
import { USER_SESSION_KEY } from "../../constants";
import { setUser } from "../../store/slice";
import { useDispatch } from "react-redux";
import { authUser } from "../../api";

export const AuthModal = ({ show, onHide, isRegister }) => {
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState(null);
  const resetServerErrors = () => setServerError(null);
  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm(getFormParams(isRegister));

  const onSubmit = async ({ email, login, password, isDriver }) => {
    const { error = "", body: user = null } = await authUser(isRegister, { email, login, password, isDriver });
    if (error) {
      setServerError(error);
      return;
    }
    sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    dispatch(setUser(user));
    reset();
    onHide();
  };

  useEffect(() => {
    setServerError(null);
    clearErrors();
  }, [show]);

  const formError =
    errors?.login?.message || errors?.email?.message || errors?.password?.message || errors?.repeatPassword?.message;
  const error = formError || serverError;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{isRegister ? "Регистрация" : "Авторизация"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {isRegister && (
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                name="login"
                type="login"
                placeholder="Иван Иванов"
                autoFocus
                {...register("login", {
                  onChange: resetServerErrors,
                })}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="name@example.ru"
              autoFocus
              {...register("email", {
                onChange: resetServerErrors,
              })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="*******"
              autoFocus
              {...register("password", {
                onChange: resetServerErrors,
              })}
            />
          </Form.Group>
          {isRegister && (
            <>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Повторите пароль</Form.Label>
                <Form.Control
                  name="repeatPassword"
                  type="password"
                  placeholder="*******"
                  autoFocus
                  {...register("repeatPassword", {
                    onChange: resetServerErrors,
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
                      onChange: resetServerErrors,
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
            <Button disabled={!!formError} type="submit" variant="primary">
              {isRegister ? "Зарегистрироваться" : "Войти"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
