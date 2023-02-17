import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import endPoints from "../routes/endpoints";
import "./Grafico.css";

const Grafico: React.FC = () => {
  const [data, setData] = useState([
    {
      data: {
        temperature: String,
        humidity: String,
        soilMoisture: String,
      },
      dateAdded: { date: String },
    },
  ]);

  const getData = async () => {
    await axios
      .get(`http://localhost:8000/${endPoints.graphData}`)
      .then((response) => {
        setData(response.data);
        console.log(data);
      });
  };

  // prototipo de grafico es:
  {
    /*
     *data = [
     *{
     *hola: algo con la hora
     *temperatura: tmp
     *humedad: hmd
     *soilMoisture: tuki
     *}
     *]
     */
  }

  {
    /*
     *<LineChart width={500} height={300} data={data}>
     *        <XAxis dataKey="{data.map((item) => item.dateAdded.date)}" />
     *        <YAxis type="number" domain={["auto", "auto "]} />
     *        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
     *        <Line type="monotone" dataKey="data.temperature" stroke="#82ca9d" />
     *        <Line type="monotone" dataKey="data.humidity" stroke="#8884d8" />
     *        <Tooltip />
     *      </LineChart>
     *
     */
  }

  return (
    <div className="Grafico">
      <AreaChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>

          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="dateAdded.date" />
        {/*
         *<YAxis type="number" domain={[25, 40]} />
         */}
        <YAxis type="number" domain={["auto", "auto"]} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="data.humidity"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />

        <Area
          type="monotone"
          dataKey="data.temperature"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>

      <Button onClick={getData}>data</Button>
    </div>
  );
};

export { Grafico };
