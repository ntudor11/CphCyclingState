import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import NavBar from "./components/NavBar";
import BikeLaneMap from "./components/BikeLaneMap";
import WeatherStats from "./components/WeatherStats";
import "./App.css";

const App = () => {
  const [coords, setCoords] = useState([]);

  // BikeLaneMap prop defined below for being able to lift coordinates state up
  const onPinClick = (prevState, data, map) => {
    if (prevState.data !== data) {
      data.features.forEach(marker => {
        var el = document.createElement("div");
        el.className = "marker";
        el.style.width = "10px";
        el.style.height = "10px";
        el.style.color = "red";
        el.style.backgroundColor = "#fff";
        el.style.border = "1px solid #ccc";
        el.addEventListener("click", function() {
          setCoords(marker.geometry.coordinates[0]);
        });
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates[0])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  marker.properties.rute_navn +
                  "</h3><p>" +
                  marker.properties.komnavn +
                  "</p>" +
                  "<p>Status: " +
                  marker.properties.beskrivelse +
                  "</p>" +
                  "<p>Date: " +
                  new Date(
                    marker.properties.inspektion_timestamp
                  ).toLocaleString() +
                  "</p>"
              )
          )
          .addTo(map);
      });
    }
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <BikeLaneMap {...props} onPinClick={onPinClick} />}
          />

          <Route
            exact
            path="/weather"
            render={props => (
              <WeatherStats {...props} lat={coords[1]} long={coords[0]} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
