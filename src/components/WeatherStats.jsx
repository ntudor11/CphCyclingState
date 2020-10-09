import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const WeatherStats = props => {
  const [state, setState] = useState({});

  const { lat, long } = props;

  useEffect(() => {
    try {
      fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/complete?altitude=0&lat=${lat}&lon=${long}`
      )
        .then(data => data.json())
        .then(data => setState(data));
    } catch (e) {
      console.log(e);
    }
  }, [lat, long]);

  let data = [];

  state.properties &&
    state.properties.timeseries.forEach(point => {
      const dataPoint = {
        name: new Date(point.time).toLocaleString(),
        temperature: point.data.instant.details.air_temperature
      };
      data.push(dataPoint);
    });

  return (
    <Container>
      <h3>
        Weather Forecast for coordinates: {lat} x {long}
      </h3>

      <LineChart
        width={800}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </Container>
  );
};

export default WeatherStats;
