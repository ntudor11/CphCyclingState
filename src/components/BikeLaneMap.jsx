import React from "react";
import Container from "@material-ui/core/Container";
import MapLayer from "./MapLayer";

const BikeLaneMap = () => {
  return (
    <Container>
      <h3>Bike Lanes in Copenhagen</h3>

      <MapLayer />
    </Container>
  );
};

export default BikeLaneMap;
