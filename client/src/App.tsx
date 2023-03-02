import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import "./App.css";
import { Logout } from "./components/Logout";
import { NavBar } from "./components/NavBar";
import { AuthGuard, RoleGuard } from "./guards";
import { PrivateRoutes, PublicRoutes, Roles } from "./models";
import { DashBoard } from "./pages/private/Dashboard";
import store from "./redux/store";
import { RoutesWithNotFound } from "./utilities";

const Login = lazy(() => import("./pages/Login/Login"));
const Private = lazy(() => import("./pages/private/Private"));

function App() {
  return (
    <div className="App">
      <NavBar />
      <Suspense fallback={<h1>cargando</h1>}>
        <Provider store={store}>
          <BrowserRouter>
            <Logout />
            <RoutesWithNotFound>
              <Route
                path="/"
                element={<Navigate to={PrivateRoutes.PRIVATE} />}
              />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE}/*`}
                  element={<Private />}
                />
              </Route>
              <Route element={<RoleGuard rol={Roles.ADMIN} />}>
                <Route path={PrivateRoutes.DASHBOARD} element={<DashBoard />} />
              </Route>
            </RoutesWithNotFound>
          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  );
}
export default App;
