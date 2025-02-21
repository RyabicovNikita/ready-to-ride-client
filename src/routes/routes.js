import { Route, Routes } from "react-router";
import { Main } from "../pages";

export const RoutesContainer = () => (
  <Routes>
    <Route path="/" element={<Main />} />
  </Routes>
);
