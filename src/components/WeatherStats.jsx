import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const WeatherStats = props => {
  const [state, setState] = useState({});

  // const { lat, long } = props;

  const [lat, long] = [55.764184, 12.199226];

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

  let temperatureData = [];
  let rainData = [];

  state.properties &&
    state.properties.timeseries.forEach(point => {
      const tempDataPoint = {
        name: new Date(point.time).toLocaleString(),
        temperature: point.data.instant.details.air_temperature
      };
      const rainDataPoint = {
        name: new Date(point.time).toLocaleString(),
        probability_of_precipitation:
          point.data.next_1_hours &&
          point.data.next_1_hours.details.probability_of_precipitation
      };
      temperatureData.push(tempDataPoint);
      rainData.push(rainDataPoint);
    });

  const data = [temperatureData, rainData];

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h3>
          Weather Forecast for coordinates: {lat} x {long}
        </h3>
      </Grid>

      {data.map(dataSet => (
        <Grid item xs={12} sm={6}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={500}
              height={300}
              data={dataSet}
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
                dataKey={dataSet.map(inDataSet => Object.keys(inDataSet)[1])[0]}
                stroke="#16a5b9"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeatherStats;
