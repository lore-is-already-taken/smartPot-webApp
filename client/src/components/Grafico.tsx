import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Legend,
  ResponsiveContainer,
} from "recharts";
import socket from "../config/socket.config";
import endPoints from "../routes/endpoints";
import "./Grafico.css";

const Grafico: React.FC = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    await axios
      .get(`http://localhost:8000/${endPoints.graphData}`)
      .then((response) => {
        setData(response.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    socket.on("graphInfo", (payload) => {
      setData((data) => [...data, payload]);
    });

    return () => {
      socket.off("hola me cai uwu");
      socket.off("hola me cai 2 uwu");
      socket.off("hola me cai 3 uwu");
    };
  }, [socket]);

  useEffect(() => {
    if (data.length >= 400) {
      const auxArray = data.map((x) => x);
      auxArray.splice(0, 1);
      setData(auxArray);
    }
    console.log(data.length);
  }, [data.length]);

  return (
    <ResponsiveContainer
      width={600}
      minWidth={200}
      height={300}
      minHeight={200}
    >
      <AreaChart data={data}>
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
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export { Grafico };
