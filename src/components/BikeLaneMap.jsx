import React from "react";
import Grid from "@material-ui/core/Grid";
import MapLayer from "./MapLayer";

const BikeLaneMap = props => {
  const { onPinClick } = props;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <h1>Biking Copenhagen</h1>

        <p>
          Summer or winter, day or night, the most used means of transportation
          in Copenhagen is the bicycle. Still, there are a few key aspects to
          consider when commuting by bike.
        </p>

        <p>
          This app aims to provide bicycle commuters and enthusiasts a way to
          prepare for their commute, by providing users an interactive map with
          the status of each main bike lane within the Greater Copenhagen Area.
        </p>

        <p>
          Also, after clicking on any marker, navigate to the Weather Stats
          component: you will be able to find detailed weather information for
          the specific coordinates that you selected. This feature will help you
          get ready with the right clothing for any weather conditions.
        </p>

        <p>
          Some people might not care about rain or snow, while others might
          choose another transportation option in such a case. Whatever your
          option is, use the app to check your route and weather conditions in
          advance.
        </p>

        <p>PS: Don't forget to wear a helmet!</p>
      </Grid>

      <Grid item xs={12} sm={6}>
        <MapLayer onPinClick={onPinClick} />
      </Grid>
    </Grid>
  );
};

export default BikeLaneMap;
