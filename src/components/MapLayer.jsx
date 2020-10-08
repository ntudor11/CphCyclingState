import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibnR1ZG9yMTEiLCJhIjoiY2tnMTB3dmZwMDRpcjJ5bjF2eGdxMzgxZCJ9.YnhPGs1aLU7MBKeUnW-cnQ";

let map = {};

// Using a class component as functional component cannot find mapContainer of undefined
class MapLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 12.199226,
      lat: 55.764184,
      zoom: 8,
      data: []
    };
  }

  componentDidMount() {
    try {
      fetch(
        "https://wfs-kbhkort.kk.dk/k101/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=k101:supercykelsti_inspektion_foto&SRSNAME=EPSG:4326&outputFormat=application%2Fjson"
      )
        .then(data => data.json())
        .then(data => this.setState({ data }));
    } catch (e) {
      console.log(e);
    }

    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  componentDidUpdate(prevState) {
    const { data } = this.state;
    if (prevState.data !== data) {
      data.features.forEach(marker => {
        new mapboxgl.Marker()
          .setLngLat(marker.geometry.coordinates[0])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                "<h3>" +
                  marker.properties.rute_navn +
                  "</h3><p>" +
                  marker.properties.komnavn +
                  "</p>"
              )
          )
          .addTo(map);
      });
    }
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
