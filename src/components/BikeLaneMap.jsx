import React from "react";
import Container from "@material-ui/core/Container";
import MapLayer from "./MapLayer";

const BikeLaneMap = props => {
  const { onPinClick } = props;

  return (
    <Container>
      <h3>Bike Lanes in Copenhagen</h3>

      <MapLayer onPinClick={onPinClick} />
    </Container>
  );
};

export default BikeLaneMap;
