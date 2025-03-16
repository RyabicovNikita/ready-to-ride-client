import "./NewTrip.scss";
import { useForm } from "react-hook-form";
import { Error, FormInput, FormSelector, MgContainer } from "../../components";
import { CITIES, TRIP_PROPS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { addTripInStore, selectUser } from "../../store";
import { createTrip } from "../../api";
import { useError } from "../../hooks";
import { useCallback, useEffect } from "react";
import { tripFormParams } from "../../utils/yup/formParams";
import { useNavigate } from "react-router";
import { DateTime } from "luxon";
import { Card, CardHeader, FloatingLabel, Form, FormSelect, InputGroup } from "react-bootstrap";
import { getError } from "../../utils/yup";

export const NewTrip = () => {
  const dispatch = useDispatch();
  const { error, handleError, resetError } = useError();
  const { id: userId } = useSelector(selectUser);
  const navigate = useNavigate();
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm(tripFormParams);
  const onSubmit = async ({ fromWhere, toWhere, datetime, passengerPrice, numberPeople }) => {
    const { error = "", body: newTrip = null } = await createTrip({
      fromWhere,
      toWhere,
      datetime,
      passengerPrice,
      numberPeople,
      createdBy: userId,
    });
    if (error) {
      handleError(error);
      return;
    }
    navigate(`/trips`);
    dispatch(addTripInStore(newTrip));
  };

  useEffect(() => {
    handleError(errors);
  }, [errors]);

  const getErrorByProp = useCallback((propName) => getError(propName, errors), [errors]);

  return (
    <div className="newTrip">
      <MgContainer style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Card>
          <CardHeader className="text-center h4">Новая поездка</CardHeader>
          <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
            {error && <Error>{error}</Error>}
            <FormSelector
              className="select-from"
              options={CITIES}
              error={getErrorByProp(TRIP_PROPS.FROM)}
              props={{
                ...register(TRIP_PROPS.FROM, {
                  onChange: resetError,
                }),
              }}
            >
              Откуда
            </FormSelector>
            <FormSelector
              className="select-to"
              options={CITIES}
              error={getErrorByProp(TRIP_PROPS.TO)}
              props={{
                ...register(TRIP_PROPS.TO, {
                  onChange: resetError,
                }),
              }}
            >
              Куда
            </FormSelector>
            <InputGroup className="mb-3 gap-3">
              <FloatingLabel label="Когда">
                <Form.Control
                  name={TRIP_PROPS.WHEN}
                  type="datetime-local"
                  className={`${getErrorByProp(TRIP_PROPS.WHEN) ? "is-invalid" : ""}`}
                  max={DateTime.now().plus({ years: 1 }).toFormat("yyyy-MM-dd'T'T").toString()}
                  min={DateTime.now().plus({ hours: 0.5 }).toFormat("yyyy-MM-dd'T'T").toString()}
                  defaultValue={DateTime.now().toFormat("yyyy-MM-dd'T'T").toString()}
                  {...register(TRIP_PROPS.WHEN, {
                    onChange: resetError,
                  })}
                />
              </FloatingLabel>
              <FloatingLabel label="Стоимость ₽">
                <Form.Control
                  name={TRIP_PROPS.PASS_PRICE}
                  type="number"
                  className={`${getErrorByProp(TRIP_PROPS.PASS_PRICE) ? "is-invalid" : ""}`}
                  defaultValue={0}
                  {...register(TRIP_PROPS.PASS_PRICE, {
                    onChange: resetError,
                  })}
                />
              </FloatingLabel>
            </InputGroup>
            <InputGroup className="mb-3">
              <FloatingLabel label="Кол-во человек">
                <Form.Control
                  name={TRIP_PROPS.PEOPLES}
                  type="number"
                  placeholder="name@example.com"
                  className={`${getErrorByProp(TRIP_PROPS.PEOPLES) ? "is-invalid" : ""}`}
                  defaultValue={1}
                  {...register(TRIP_PROPS.PEOPLES, {
                    onChange: resetError,
                  })}
                />
              </FloatingLabel>
            </InputGroup>
            <div className="d-flex justify-content-center">
              <button type="submit" class="btn btn-dark">
                Опубликовать
              </button>
            </div>
          </Form>
        </Card>
      </MgContainer>
    </div>
  );
};
