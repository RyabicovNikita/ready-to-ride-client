import { HeaderButton } from "../../../../../Button";
import { useContext } from "react";
import { UnconfirmedContext } from "../../../../../../context";
import { Link } from "react-router";

export const UserNavBar = ({ isDriver }) => {
  const { unconfirmedTrips } = useContext(UnconfirmedContext);
  return isDriver ? (
    <>
      <div className="position-relative">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
          {unconfirmedTrips?.length ?? 0}
          <span class="visually-hidden">На подтверждении</span>
        </span>
        <HeaderButton to={window.location.origin + "/trips/unconfirmed"}>На подтверждении</HeaderButton>
      </div>
      <HeaderButton to={window.location.origin + "/trips"}>Поездки</HeaderButton>
    </>
  ) : (
    <>
      <HeaderButton to={window.location.origin + "/trips"}>Поездки</HeaderButton>
      <Link to={window.location.origin + "/trips/new"}>
        <span className="btn btn-dark w-100">Новая поездка</span>
      </Link>
    </>
  );
};
