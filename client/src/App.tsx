import "./App.css";
import { useEffect, useState } from "react";

import io from "socket.io-client";
import { Grafico } from "./components/Grafico";
import { NavBar } from "./components/NavBar";
import ServoButton from "./components/ServoButton";
import OutlinedCard from "./components/InfoCard";
import socket from "./config/socket.config";
import endPoints from "./routes/endpoints";
import SimpleAccordion from "./components/Accordion";

interface info {
  nombre: string;
  dato: number;
}
let temperaturas: Array<info> = [];
let humedad: Array<info>;
let humedadSueo: Array<info>;

const App = () => {
  const [humidity, setHumidity] = useState("N/A");
  const [tmp, setTmp] = useState("N/A");
  const [suelo, setSuelo] = useState("N/A");

  useEffect(() => {
    socket.on(endPoints.enviromentData, (data) => {
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
      <NavBar />
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

export default App;
