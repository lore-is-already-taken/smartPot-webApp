import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { PrivateRoutes } from "../../models";
import { RoutesWithNotFound } from "../../utilities";

const DashBoard = lazy(() => import("./Dashboard/Dashboard"));
const Home = lazy(() => import("./Home/Home"));

const Private = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
      <Route
        path={PrivateRoutes.PRIVATE}
        element={<Navigate to={PrivateRoutes.HOME} />}
      />
      <Route path={PrivateRoutes.DASHBOARD} element={<DashBoard />} />
      <Route path={PrivateRoutes.HOME} element={<Home />} />
    </RoutesWithNotFound>
  );
};

export default Private;
