import { useCallback, useContext, useEffect, useState } from "react";
import { EditTrip, Trip } from "./components";
import { useNavigate, useParams } from "react-router";
import { AuthModalContext } from "../../context";
import { logoutUserIfTokenExpired } from "../../utils";
import { useDispatch } from "react-redux";
import { redGetTrip } from "../../store";
import { useError, useLoader } from "../../hooks";
import { getTripByID } from "../../api";
import { Loader, MgContainer } from "../../components";
import { Container } from "react-bootstrap";

export const TripPage = () => {
  const [tripEdit, setTripEdit] = useState(false);
  const { authModalView } = useContext(AuthModalContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  id = Number(id);

  const { loading, hideLoader, showLoader } = useLoader();

  const { error, handleError, resetError } = useError();

  const checkTokenExpired = useCallback(
    (error) => logoutUserIfTokenExpired({ error, handleError, dispatch, navigate, authModalView, resetError }),
    []
  );

  useEffect(() => {
    showLoader();
    getTripByID(id).then((res) => {
      hideLoader();
      if (res.error) {
        checkTokenExpired(res.error);
        return;
      }
      dispatch(redGetTrip(res.body));
    });
  }, []);

  return (
    <>
      {loading && <Loader />}
      <MgContainer
        style={{
          placeItems: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Container className="trip" style={{ filter: `blur(${loading ? "10px" : "0"})` }}>
          {tripEdit ? (
            <EditTrip
              setTripEdit={setTripEdit}
              id={id}
              dispatch={dispatch}
              checkTokenExpired={checkTokenExpired}
              error={error}
              handleError={handleError}
              resetError={resetError}
            />
          ) : (
            <Trip
              setTripEdit={setTripEdit}
              id={id}
              navigate={navigate}
              dispatch={dispatch}
              error={error}
              resetError={resetError}
              handleError={handleError}
            />
          )}
        </Container>
      </MgContainer>
    </>
  );
};
