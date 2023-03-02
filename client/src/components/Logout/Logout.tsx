import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../models";
import { resetUser, userKey } from "../../redux/states/user";
import { clearLocalStorage } from "../../utilities";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    clearLocalStorage(userKey);
    navigate(PublicRoutes.LOGIN);
    dispatch(resetUser());
  };

  return <Button onClick={logout}>Logout</Button>;
};

export default Logout;
