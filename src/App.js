import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import BikeLaneMap from "./components/BikeLaneMap";
import WeatherStats from "./components/WeatherStats";
import "./App.css";

const App = () => {
  const lat = 55.6761;
  const long = 12.5683;

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={BikeLaneMap} />
          <Route
            exact
            path="/weather"
            render={props => <WeatherStats {...props} lat={lat} long={long} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
