import "./Trips.scss";
import { useContext, useEffect, useState } from "react";
import { Loader, TripCard } from "../../components";
import { getTrips } from "../../api";
import { useError, useLoader } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { addTripsInStore, logoutUserFromStore, selectTrips, selectUser } from "../../store";
import { useNavigate } from "react-router";
import { ModalContext } from "../../context";
import { CITIES, USER_SESSION_KEY } from "../../constants";
import { useForm } from "react-hook-form";
import { filteredTripFormParams } from "../../yup";
import { Card } from "react-bootstrap";

export const Trips = ({ onlyUserTrips }) => {
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState();
  const { loading, showLoader, hideLoader } = useLoader();
  const { modalView } = useContext(ModalContext);

  const navigate = useNavigate();
  const trips = useSelector(selectTrips);
  const dispatch = useDispatch();
  const { error, handleError, resetError } = useError();
  const { id: userID, isDriver } = useSelector(selectUser);
  useEffect(() => {
    showLoader();
    let timeOutID;
    getTrips(onlyUserTrips, filter).then((res) => {
      hideLoader();
      if (res?.error) {
        handleError(res);

        if (res.error === "jwt expired") {
          sessionStorage.removeItem(USER_SESSION_KEY);
          dispatch(logoutUserFromStore());
          if (timeOutID) clearTimeout(timeOutID);
          timeOutID = setTimeout(() => {
            navigate("/login");
            modalView();
            resetError();
          }, 3000);
        }
        return;
      }
      dispatch(addTripsInStore(res.body));
    });

    return () => {
      clearTimeout(timeOutID);
      resetError();
    };
  }, [isFilter]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(filteredTripFormParams);
  const onSubmit = async ({
    fromWhere,
    toWhere,
    dateTrip,
    timeTrip,
    notDriver,
    priceFrom,
    priceTo,
    numberPeopleFrom,
    numberPeopleTo,
  }) => {
    setFilter({
      fromWhere,
      toWhere,
      dateTrip,
      timeTrip,
      notDriver,
      priceFrom,
      priceTo,
      numberPeopleFrom,
      numberPeopleTo,
    });
    setIsFilter((prevState) => !prevState);
  };

  return (
    <div className="d-flex flex-column gap-3 h-100">
      {loading && <Loader />}
      <div className="trips card">
        <div className="d-flex flex-column align-items-center">
          <div class="card mt-5">
            <form onSubmit={handleSubmit(onSubmit)} className="trip__card-body card-body">
              <h5 class="card-title">Фильтры</h5>
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
                  Дата
                </span>
                <input
                  type="date"
                  class="form-control"
                  placeholder=""
                  aria-label="Дата"
                  {...register("dateTrip", {
                    onChange: resetError,
                  })}
                />
                <span class="input-group-text">Время</span>
                <input
                  type="time"
                  class="form-control"
                  placeholder=""
                  aria-label="Время"
                  {...register("timeTrip", {
                    onChange: resetError,
                  })}
                />
              </div>

              <Card.Title>Стоимость</Card.Title>
              <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  От
                </span>
                <input
                  type="number"
                  class="form-control"
                  placeholder=""
                  aria-label="От"
                  {...register("priceFrom", {
                    onChange: resetError,
                  })}
                />
                <span class="input-group-text">До</span>
                <input
                  type="number"
                  class="form-control"
                  placeholder=""
                  aria-label="До"
                  {...register("priceTo", {
                    onChange: resetError,
                  })}
                />
              </div>

              <Card.Title>Кол-во человек</Card.Title>
              <div class="form-floating mb-3">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="inputGroup-sizing-default">
                    От
                  </span>
                  <input
                    type="number"
                    class="form-control"
                    placeholder=""
                    aria-label="От"
                    {...register("numberPeopleFrom", {
                      onChange: resetError,
                    })}
                  />
                  <span class="input-group-text">До</span>
                  <input
                    type="number"
                    class="form-control"
                    placeholder=""
                    aria-label="До"
                    {...register("numberPeopleTo", {
                      onChange: resetError,
                    })}
                  />
                </div>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  {...register("notDriver", {
                    onChange: resetError,
                  })}
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Водитель не указан
                </label>
              </div>
              <div className="d-flex justify-content-center">
                <button onClick={() => reset()} className="btn btn-secondary w-50 m-2">
                  Очистить фильтр
                </button>
                <button type="submit" className="btn btn-primary w-25 m-2">
                  Применить
                </button>
              </div>
            </form>
          </div>
          <h1>Поездки</h1>
          {error ? (
            <div class="alert alert-danger" role="alert">
              {error === "jwt expired"
                ? "Ваш сеанс устарел, перенаправление на страницу авторизации..."
                : error?.message ?? error?.error ?? error}
            </div>
          ) : (
            trips.map((trip, index) => (
              <TripCard
                id={trip.id}
                userID={userID}
                curUserIsDriver={isDriver}
                key={index}
                dateTravel={trip.dateTravel}
                timeTravel={trip.timeTravel}
                driver={trip.driver}
                passenger={trip.creator}
                fromWhere={trip.fromWhere}
                toWhere={trip.toWhere}
                passengersNumber={trip.passengersNumber}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
