import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import RoomIcon from "@material-ui/icons/Room";

mapboxgl.accessToken =
  "pk.eyJ1IjoibnR1ZG9yMTEiLCJhIjoiY2tnMTB3dmZwMDRpcjJ5bjF2eGdxMzgxZCJ9.YnhPGs1aLU7MBKeUnW-cnQ";

// demo data below
var geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        message: "Foo",
        iconSize: [60, 60]
      },
      geometry: {
        type: "Point",
        coordinates: [-66.324462890625, -16.024695711685304]
      }
    },
    {
      type: "Feature",
      properties: {
        message: "Bar",
        iconSize: [50, 50]
      },
      geometry: {
        type: "Point",
        coordinates: [-61.2158203125, -15.97189158092897]
      }
    },
    {
      type: "Feature",
      properties: {
        message: "Baz",
        iconSize: [40, 40]
      },
      geometry: {
        type: "Point",
        coordinates: [-63.29223632812499, -18.28151823530889]
      }
    }
  ]
};

// Using a class component as functional component cannot find mapContainer of undefined
class MapLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    geojson.features.forEach(marker => {
      new mapboxgl.Marker()
        .setLngLat(marker.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              "<h3>" +
                marker.properties.message +
                "</h3><p>" +
                marker.geometry.type +
                "</p>"
            )
        )
        .addTo(map);
    });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
            {this.state.zoom}
          </div>
        </div>
        <div ref={el => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default MapLayer;
