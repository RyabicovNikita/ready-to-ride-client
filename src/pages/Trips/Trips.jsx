import "./Trips.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import { Loader, PriceModal, TripCard } from "../../components";
import { getTrips } from "../../api";
import { useError, useLoader } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { addTripsInStore, selectTrips, selectUser } from "../../store";
import { useNavigate } from "react-router";
import { CITIES, SELECTED_VALUES } from "../../constants";
import { useForm } from "react-hook-form";
import { filteredTripFormParams } from "../../utils/yup/formParams";
import { Card } from "react-bootstrap";
import { AuthModalContext } from "../../context";
import { logoutUserIfTokenExpired, renderError } from "../../utils";

export const Trips = ({ onlyUserTrips }) => {
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState();

  const { authModalView } = useContext(AuthModalContext);

  const { loading, showLoader, hideLoader } = useLoader();

  const navigate = useNavigate();
  const trips = useSelector(selectTrips);
  const dispatch = useDispatch();
  const { error, handleError, resetError } = useError();
  const { id: userID, isDriver } = useSelector(selectUser);

  const checkTokenExpired = useCallback(
    (error) => logoutUserIfTokenExpired({ error, handleError, dispatch, navigate, authModalView, resetError }),
    []
  );

  useEffect(() => {
    showLoader();
    let timeOutID;
    getTrips(onlyUserTrips, filter).then((res) => {
      hideLoader();
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      dispatch(addTripsInStore(res.body));
    });

    return () => {
      clearTimeout(timeOutID);
      resetError();
    };
  }, [isFilter]);

  const { register, reset, handleSubmit } = useForm(filteredTripFormParams);
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
    const isNotDriver = notDriver === "true";
    setFilter({
      fromWhere,
      toWhere,
      dateTrip,
      timeTrip,
      notDriver: notDriver === SELECTED_VALUES.NOT_SELECT ? notDriver : isNotDriver,
      priceFrom,
      priceTo,
      numberPeopleFrom,
      numberPeopleTo,
    });
    setIsFilter((prevState) => !prevState);
  };

  const onChange = () => {
    resetError();
  };

  return (
    <div className="d-flex flex-column gap-3 h-100">
      {loading && <Loader />}
      <PriceModal />
      <div className="trips card" style={{ filter: `blur(${loading ? "10px" : "0"})` }}>
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
                    onChange: onChange,
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
                    onChange: onChange,
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
                    onChange: onChange,
                  })}
                />
                <span class="input-group-text">Время</span>
                <input
                  type="time"
                  class="form-control"
                  placeholder=""
                  aria-label="Время"
                  {...register("timeTrip", {
                    onChange: onChange,
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
                    onChange: onChange,
                  })}
                />
                <span class="input-group-text">До</span>
                <input
                  type="number"
                  class="form-control"
                  placeholder=""
                  aria-label="До"
                  {...register("priceTo", {
                    onChange: onChange,
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
                      onChange: onChange,
                    })}
                  />
                  <span class="input-group-text">До</span>
                  <input
                    type="number"
                    class="form-control"
                    placeholder=""
                    aria-label="До"
                    {...register("numberPeopleTo", {
                      onChange: onChange,
                    })}
                  />
                </div>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Водитель
                </span>
                <select
                  id="from-selector"
                  className="form-select form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  {...register("notDriver", {
                    onChange: onChange,
                  })}
                >
                  <option value={SELECTED_VALUES.NOT_SELECT}>{SELECTED_VALUES.NOT_SELECT}</option>
                  <option value={true}>Отсутствует</option>
                  <option value={false}>Указан</option>
                </select>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  onClick={() => {
                    reset();
                    resetError();
                  }}
                  className="btn btn-secondary w-50 m-2"
                >
                  Очистить фильтр
                </button>
                <button type="submit" className="btn btn-dark w-25 m-2">
                  Применить
                </button>
              </div>
            </form>
          </div>
          <h1>Поездки</h1>
          {renderError(error)}
          {!error &&
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
                status={trip.status}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
