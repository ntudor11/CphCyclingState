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

const importAll = r => {
  let images = {};
  r.keys().map(item => (images[item.replace("./", "")] = r(item)));
  return images;
};

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

  const images = importAll(
    require.context("../images", false, /\.(png|jpe?g|svg)$/)
  );

  let temperatureData = [];
  let rainData = [];

  state.properties &&
    state.properties.timeseries.forEach(point => {
      const tempDataPoint = {
        name: new Date(point.time).toLocaleString(),
        air_temperature: point.data.instant.details.air_temperature
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

  const symbols = new Set();

  state.properties &&
    state.properties.timeseries.forEach(point => {
      // console.log(point.data);
      symbols.add(
        point.data.next_1_hours && point.data.next_1_hours.summary.symbol_code
      );
      symbols.add(
        point.data.next_6_hours && point.data.next_6_hours.summary.symbol_code
      );
      symbols.add(
        point.data.next_12_hours && point.data.next_12_hours.summary.symbol_code
      );
    });

  const symbolsArr = Array.from(symbols)
    .filter(s => s !== undefined)
    .sort();
  console.log(symbolsArr);

  const getKeyFromVal = (object, value, str = "") => {
    return Object.keys(object !== undefined && object).find(key =>
      str !== "" ? key === str : object[key] === value
    );
  };

  const { details } =
    (state.properties && state.properties.timeseries[0].data.instant) || {};

  const { units } = (state.properties && state.properties.meta) || {};

  const { next_1_hours } =
    (state.properties && state.properties.timeseries[0].data) || {};

  const currentTime = [
    {
      value: details && details.air_temperature,
      unit: units && units.air_temperature,
      kpi: getKeyFromVal(units, units !== undefined && units.air_temperature)
    },
    {
      value: details && details.wind_speed,
      unit: units && units.wind_speed,
      kpi: getKeyFromVal(units, units !== undefined && units.wind_speed)
    },
    {
      value: next_1_hours && next_1_hours.details.probability_of_precipitation,
      unit: units && units.probability_of_precipitation,
      kpi: getKeyFromVal(
        units,
        units !== undefined && units.probability_of_precipitation,
        "probability_of_precipitation"
      )
    },
    {
      value: next_1_hours && next_1_hours.summary.symbol_code,
      unit: "",
      kpi: next_1_hours && next_1_hours.summary.symbol_code
    }
  ];

  // return gui component for each current kpi
  const currentKpi = kpis =>
    kpis.map(kpi => (
      <Grid item xs={6} sm={3}>
        <h4>
          {kpi.unit === "" ? (
            <img
              className="weatherIcon"
              src={images[`${kpi.value}.svg`]}
              alt={kpi.value}
            />
          ) : (
            <span>
              {kpi.value} {kpi.unit}
            </span>
          )}
        </h4>
        <p>{kpi.kpi}</p>
      </Grid>
    ));

  const formatString = str => {
    return str.replace(/_/g, " ").replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <Grid container spacing={1}>
      {currentKpi(currentTime)}

      <Grid item xs={12}>
        <h3>
          Weather Forecast for coordinates: {lat} x {long}
        </h3>
      </Grid>

      {state.properties &&
        // tweaks for appending the unit of measurement
        data.map(dataSet => {
          const i = new Set();
          let unit = "";
          dataSet.map(inDataSet => i.add(Object.keys(inDataSet)[1])[0]);
          for (let [key, value] of Object.entries(
            state.properties.meta.units
          )) {
            if (i.has(key)) {
              unit = value;
            }
          }

          return (
            <Grid item xs={12} sm={6} key={unit}>
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
                    dataKey={
                      dataSet.map(inDataSet => Object.keys(inDataSet)[1])[0]
                    }
                    name={`${
                      dataSet.map(inDataSet =>
                        formatString(Object.keys(inDataSet)[1])
                      )[0]
                    } (${unit})`}
                    stroke="#16a5b9"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default WeatherStats;
