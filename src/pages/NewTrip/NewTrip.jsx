import { useForm } from "react-hook-form";
import { MgContainer } from "../../components";
import { CITIES } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { addTripInStore, selectUser } from "../../store";
import { createTrip } from "../../api";
import { useError } from "../../hooks";
import { useEffect } from "react";
import { tripFormParams } from "../../utils/yup/formParams";
import { useNavigate } from "react-router";
import background from "../../images/backgroundRR.jpg";
import { DateTime } from "luxon";

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
    navigate(`/trips`);
    dispatch(addTripInStore(newTrip));
  };

  useEffect(() => {
    handleError(errors);
  }, [errors]);

  return (
    <div
      className="trip"
      style={{
        width: "100%",
      }}
    >
      <MgContainer style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <section
          className="trip__card card"
          style={{
            width: "600px",
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: "30px",
          }}
        >
          <h1 className="trip__title" style={{ textAlign: "center", marginBottom: "50px" }}>
            Новая поездка
          </h1>
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
                max={DateTime.now().plus({ years: 1 }).toFormat("yyyy-MM-dd'T'T").toString()}
                min={DateTime.now().toFormat("yyyy-MM-dd'T'T").toString()}
                defaultValue={DateTime.now().toFormat("yyyy-MM-dd'T'T").toString()}
              />
              <span class="input-group-text" id="inputGroup-sizing-default">
                Стоимость
              </span>
              <input
                type="number"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                defaultValue={0}
                style={{ maxWidth: "25%" }}
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
              <button type="submit" class="btn btn-dark">
                Опубликовать
              </button>
            </div>
          </form>
        </section>
      </MgContainer>
    </div>
  );
};
