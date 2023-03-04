import React, { useEffect, useState } from "react";
import { Grafico } from "../../../components/Grafico";
import OutlinedCard from "../../../components/InfoCard";
import ServoButton from "../../../components/ServoButton";
import socket from "../../../config/socket.config";
import { endPoints } from "../../../models";

const DashBoard: React.FC<{}> = () => {
  const [humidity, setHumidity] = useState("N/A");
  const [tmp, setTmp] = useState("N/A");
  const [suelo, setSuelo] = useState("N/A");

  useEffect(() => {
    socket.on(endPoints.ENVIROMENTDATA, (data) => {
      setTmp(Number(data.temperature).toFixed(2));
      setHumidity(Number(data.humidity).toFixed(2));
      setSuelo(data.soilMoisture);
    });

    return () => {
      socket.off("este es el return de connect");
      socket.off("este es el return dedisconnect");
      socket.off("este es el return del se me olvido");
    };
  }, [socket]);

  return (
    <div>
      <div className="MainView">
        <div className="graficoView">
          <Grafico />
        </div>
        <div className="infoView">
          <ServoButton placeHolder="Servo" id="aidi del servo" />
          <OutlinedCard texto="Temperatura" value={tmp} />
          <OutlinedCard texto="Humedad" value={humidity} />
          <OutlinedCard texto="Suelo" value={suelo} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
