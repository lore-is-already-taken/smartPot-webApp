import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../components/Logout";
import { PrivateRoutes, PublicRoutes, Roles } from "../../models";
import { createUser, resetUser, userKey } from "../../redux/states/user";
import { getMorty } from "../../services";
import { clearLocalStorage } from "../../utilities";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    clearLocalStorage(userKey);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  }, []);

  const login = async () => {
    try {
      const result = await getMorty();
      dispatch(createUser({ ...result, rol: Roles.USER }));
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
    } catch (e) {}
  };

  return (
    <div>
      <h2>Hola este es el login</h2>
      <Button onClick={login}>Clickeame</Button>
    </div>
  );
};

export default Login;
