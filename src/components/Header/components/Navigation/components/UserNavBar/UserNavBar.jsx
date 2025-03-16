import { NavLink } from "react-bootstrap";
import { HeaderButton } from "../../../../../Button";
import { useContext } from "react";
import { UnconfirmedContext } from "../../../../../../context";

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
      <NavLink to={window.location.origin + "/trips/new"}>
        <div className="btn btn-dark w-100">Новая поездка</div>
      </NavLink>
    </>
  );
};
