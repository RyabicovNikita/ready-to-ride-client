import { useForm } from "react-hook-form";
import { MgContainer } from "../../components";
import { CITIES } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { addTripInStore, selectUser } from "../../store";
import { createTrip } from "../../api";
import { useError } from "../../hooks";
import { useEffect } from "react";
import { tripFormParams } from "../../yup";
import { useNavigate } from "react-router";

export const NewTrip = () => {
  const dispatch = useDispatch();
  const { error, handleError, resetError } = useError();
  const { id: userId } = useSelector(selectUser);
  const navigate = useNavigate();
  const {
    register,
    reset,
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
    navigate(`/`);
    dispatch(addTripInStore(newTrip));
  };

  useEffect(() => {
    handleError(errors);
  }, [errors]);

  return (
    <div className="trip" style={{ width: "100%" }}>
      <MgContainer style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1 className="trip__title" style={{ textAlign: "center", marginBottom: "50px" }}>
          Новая поездка
        </h1>
        <section className="trip__card card" style={{ width: "600px" }}>
          <form onSubmit={handleSubmit(onSubmit)} className="trip__card-body card-body">
            {error && (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Откуда
              </span>
              <select
                id="from-selector"
                className="form-select form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                {...register("fromWhere", {
                  onChange: resetError,
                })}
              >
                {CITIES.map((city) => (
                  <option>{city}</option>
                ))}
              </select>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Куда
              </span>
              <select
                id="from-selector"
                className="form-select form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                {...register("toWhere", {
                  onChange: resetError,
                })}
              >
                {CITIES.map((i) => (
                  <option>{i}</option>
                ))}
              </select>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">
                Когда
              </span>
              <input
                type="datetime-local"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                {...register("datetime", {
                  onChange: resetError,
                })}
              />
              <span class="input-group-text" id="inputGroup-sizing-default">
                Стоимость
              </span>
              <input
                type="number"
                class="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                defaultValue={0}
                {...register("passengerPrice", {
                  onChange: resetError,
                })}
              />
              <span class="input-group-text" id="basic-addon2">
                ₽
              </span>
            </div>
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                id="floatingInput"
                defaultValue={1}
                {...register("numberPeople", {
                  onChange: resetError,
                })}
              />
              <label for="floatingInput">Кол-во человек</label>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" class="btn btn-primary">
                Опубликовать
              </button>
            </div>
          </form>
        </section>
      </MgContainer>
    </div>
  );
};
