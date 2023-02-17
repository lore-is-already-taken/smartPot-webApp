import { Switch } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import socket from "../config/socket.config";

interface MyButton {
  placeHolder: string;
  id: string;
}

const MAIN_URL = "http://localhost:8000";
const endPoints = {
  smartPot: "/smartPot",
};

const ServoButton: React.FC<MyButton> = (props) => {
  const [servoValue, setServoValue] = useState("1");

  const toggleServo = async (estado: string) => {
    const url = `${MAIN_URL + endPoints.smartPot}`;

    const response = await axios.post(
      url,
      { msg: "hola" },
      { headers: { msg: estado } }
    );
    return response;
  };

  const handleServo = async () => {
    const response = await toggleServo(servoValue);

    if (servoValue === "1") {
      setServoValue("0");
    } else {
      setServoValue("1");
    }
  };

  return (
    <div className="servoController">
      <p>{props.placeHolder}</p>
      <Switch onClick={handleServo} />
    </div>
  );
};

export default ServoButton;
