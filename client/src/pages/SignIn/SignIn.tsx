import { Avatar, Button } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./SignIn.css";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import { UserInfo } from "../../models";
import axios from "axios";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const user: UserInfo = {
      name: name,
      email: email,
      password: password,
    };
    axios.post("http://localhost:8000/users", user);
  };
  return (
    <div className="signInComoponent">
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Box component="form" onSubmit={createUser} noValidate sx={{ mt: 1 }}>
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
