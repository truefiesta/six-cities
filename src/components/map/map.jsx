import React, {PureComponent, createRef} from "react";
import leaflet from "leaflet";
import {CityCoordinates} from "../../const.js";
import PropTypes from "prop-types";

const ZOOM = 12;
const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [27, 39],
});

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._markers = null;
    this._mapRef = createRef();
  }

  _addMarkers(map) {
    const {offers} = this.props;
    this._markers = leaflet.layerGroup();

    offers.forEach((offer) => {
      leaflet
        .marker(offer.coordinates, {icon})
        .addTo(this._markers);
    });

    this._markers.addTo(map);
  }

  _clearMarkers() {
    this._markers.clearLayers();
  }

  _createMap(mapRef, city) {
    this._map = leaflet.map(mapRef, {
      center: CityCoordinates[city],
      zoom: ZOOM,
      zoomControl: false,
      marker: true,
    });
  }

  _setMapView(city) {
    this._map.setView(CityCoordinates[city], ZOOM);
  }

  _addTileLayer(map) {
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);
  }

  componentDidMount() {
    const mapRef = this._mapRef.current;
    const {city} = this.props;

    this._createMap(mapRef, city);
    this._setMapView(city);
    this._addTileLayer(this._map);
    this._addMarkers(this._map);
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}} ref={this._mapRef}></div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      this._clearMarkers();
      this._setMapView(this.props.city);
      this._addMarkers(this._map);
    }

  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(
            PropTypes.number
        ).isRequired,
      }).isRequired
  ).isRequired,
  city: PropTypes.string.isRequired,
};

export default Map;
