import { Avatar, Button } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./SignIn.css";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import { UserInfo, PrivateRoutes } from "../../models";
import axios from "axios";
import { userEndpoints } from "../../utilities/enspoints.utility";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/states/user";
import { emailRegex, nameRegex, passwordRegex } from "../../utilities";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestCreateUser = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    //checking if the data given by the user is valid
    if (!emailRegex.test(email)) {
      alert("Invalid email ");
    } else if (!passwordRegex.test(password)) {
      alert("Invalid pasword");
    } else if (!nameRegex.test(name)) {
      alert("Invalid name");
    } else {
      const user: UserInfo = {
        name: name,
        email: email.toLowerCase(),
        password: password,
      };
      const response = await axios.post(userEndpoints.createUser, user);
      dispatch(createUser(response.data));
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
    }
  };

  return (
    <div className="signInComoponent">
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Box
        component="form"
        onSubmit={requestCreateUser}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="user"
          label="Name"
          name="Name"
          autoComplete="name"
          autoFocus
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Account
        </Button>
      </Box>
    </div>
  );
};

export default SignIn;
