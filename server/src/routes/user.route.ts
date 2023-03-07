import express from "express";
import {
  createUser,
  getUser,
} from "../db/services/UserServices/userServices.service";

const user = express();

user.post("/user/createUser", async (req, res) => {
  const response = await createUser(req.body);

  return res.send(response);
});

user.post("/user/getuser", async (req, res) => {
  console.log(req.body);
  const response = await getUser(req.body);
  return res.send(response);
});

export default user;
