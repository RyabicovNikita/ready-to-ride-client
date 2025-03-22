import "./Trip.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { usePriceModalContext } from "../../../../hooks";
import { Comments, ConfirmModal, PriceModal } from "../../../../components";
import { UserInfoCard } from "../UserInfoCard";
import { redAddComment, selectTrip, selectUser } from "../../../../store";
import { addUnconfirmedTrip, getTripPrePrice, logoutUserIfTokenExpired, renderError } from "../../../../utils";
import { AuthModalContext, UnconfirmedContext } from "../../../../context";
import { CardHeader } from "../CardHeader";

import { TripPeoples } from "../TripPeoples";
import { ActionButtons } from "./components";
import { getOnClickActions } from "./utils";
import { useForm } from "react-hook-form";
import { FloatingLabel, Form } from "react-bootstrap";
import { getError } from "../../../../utils/yup";
import { addParentCommentInTrip } from "../../../../api/comment";
import { TravelInfoCard } from "../TravelInfoCard";

export const Trip = ({ setTripEdit, id, checkTokenExpired, navigate, dispatch, error, handleError, resetError }) => {
  const commentScrollRef = useRef(null);
  const trip = useSelector(selectTrip);

  const prePrice = useMemo(() => getTripPrePrice(trip?.driver?.price, trip?.creator?.price), [trip]);

  const [confirmModalState, setConfirmModalState] = useState("");
  const [confirmModalShow, setConfirmModalShow] = useState(false);

  const modalShow = () => setConfirmModalShow(true);
  const modalHide = () => setConfirmModalShow(false);
  const { unconfirmedTrips, setUnconfirmedTrips } = useContext(UnconfirmedContext);
  const { priceModalView } = usePriceModalContext();

  const { id: userID, isDriver, role } = useSelector(selectUser);

  const isUnconfirmedTrips = unconfirmedTrips?.find((i) => i.id === id);

  useEffect(() => {
    if (commentScrollRef?.current) commentScrollRef.current.scrollIntoView();
  }, [trip]);

  const onUncofirmedTripsClick = () =>
    addUnconfirmedTrip({
      curTripID: id,
      passenger: trip.creator,
      priceModalView: priceModalView,
      setUnconfirmedTrips,
      unconfirmedTrips,
    });

  const onEditTripClick = () => setTripEdit(true);

  const clickActions = {
    ...getOnClickActions({
      id,
      checkTokenExpired: checkTokenExpired,
      dispatch: dispatch,
      modalShow: modalShow,
      navigate: navigate,
      prePrice,
      setConfirmModalState: setConfirmModalState,
    }),
    onEditTripClick: onEditTripClick,
  };

  const { authModalView } = useContext(AuthModalContext);

  const shapeObject = {
    comment: yup.string().required("Введите комментарий").max(10000, "Комментарий не может превышать 10 тысяч символов"),
  };

  const formSchema = yup.object().shape(shapeObject);

  const formParams = {
    defaulValues: {},
    resolver: yupResolver(formSchema),
  };
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm(formParams);

  const commentError = useMemo(() => getError("comment", errors), [errors]);

  const submitNewComment = async ({ comment }) => {
    const res = await addParentCommentInTrip(id, userID, comment);
    reset({ comment: "" });
    resetError();
    if (res.error) {
      logoutUserIfTokenExpired({
        error: res.error,
        authModalView: authModalView,
        handleError: handleError,
        dispatch: dispatch,
        navigate: navigate,
        resetError: resetError,
      });
      return;
    }
    dispatch(redAddComment(res.body));
    if (commentScrollRef?.current) commentScrollRef.current.scrollIntoView();
  };
  const commentsAvailable = userID === trip?.creator?.id || userID === trip?.driver?.id;

  return (
    <>
      <PriceModal />
      <ConfirmModal show={confirmModalShow} modalHide={modalHide} data={confirmModalState} />
      {renderError(error)}
      {!error && (
        <>
          <CardHeader status={trip.status} statusColor={trip.statusColor}></CardHeader>

          <TravelInfoCard
            dateTravel={trip.dateTravel}
            timeTravel={trip.timeTravel}
            fromWhere={trip.fromWhere}
            toWhere={trip.toWhere}
          />

          <div className="trip__participants">
            <UserInfoCard userName={trip?.driver?.userName} userPrice={trip?.driver?.price} role={"driver"} />
            <UserInfoCard
              userName={trip?.creator?.userName}
              passengersNumber={trip.passengersNumber}
              userPrice={trip?.creator?.price}
              role={"passenger"}
            />
          </div>

          <div className="comments mb-3">
            {<Comments commentsAvailable={commentsAvailable} commentScrollRef={commentScrollRef} />}
            {commentsAvailable && (
              <Form className="newComment mt-4 mb-4 d-flex gap-3" onSubmit={handleSubmit(submitNewComment)}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Новый комментарий"
                  className={`w-100 ${commentError ? "text-danger" : ""}`}
                >
                  <textarea
                    name="comment"
                    className={`comment form-control ${commentError ? "is-invalid" : ""}`}
                    class="form-control"
                    placeholder="Новый комментарий"
                    {...register("comment", {
                      onChange: () => {
                        clearErrors();
                        resetError();
                      },
                    })}
                  />
                </FloatingLabel>
                <div className="d-flex align-items-center">
                  <button className="comments__send mr-3 d-flex align-items-center" type="submit">
                    <i class="bi bi-send"></i>
                  </button>
                </div>
              </Form>
            )}
          </div>
          <div className="trip__footer">
            <TripPeoples>
              <span>{trip.passengersNumber}</span>
            </TripPeoples>
            <ActionButtons isDriver={isDriver} role={role} trip={trip} userID={userID} actions={clickActions} />
            <div className="trip__footer-totalPrice">
              <div className="trip__footer-totalPrice-container">
                {trip.totalPrice > 0 ? (
                  trip.totalPrice + " ₽"
                ) : (
                  <div className="d-flex flex-column">
                    <span>Стоимость в обсуждении...</span>
                    <span className="trip__userCard-price">Предварительно {prePrice} ₽</span>
                  </div>
                )}
              </div>
              {isDriver && !trip?.driver?.userName && (
                <button
                  className={`btn ${isUnconfirmedTrips ? "btn-danger" : "btn-dark"}`}
                  onClick={onUncofirmedTripsClick}
                >
                  {isUnconfirmedTrips ? "Не едем" : "Едем"}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
