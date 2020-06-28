import React, {PureComponent, createRef} from "react";
import leaflet from "leaflet";
import {CityCoordinates, CityName} from "../../const.js";
import PropTypes from "prop-types";

const zoom = 12;
const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [27, 39],
});

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._currentCity = CityName.AMSTERDAM;
    this._mapRef = createRef();
  }

  _addMarkers(map) {
    const {offers} = this.props;

    offers.filter((offer) => {
      const {city, coordinates} = offer;

      if (city === this._currentCity) {
        leaflet
        .marker(coordinates, {icon})
        .addTo(map);
      }
    });
  }

  componentDidMount() {
    const mapRef = this._mapRef.current;

    const map = leaflet.map(mapRef, {
      center: CityCoordinates[this._currentCity],
      zoom,
      zoomControl: false,
      marker: true,
    });

    map.setView(CityCoordinates[this._currentCity], zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    this._addMarkers(map);
  }

  render() {
    return (
      <div className="cities__right-section">
        <section className="cities__map map">
          <div id="map" style={{height: `100%`}} ref={this._mapRef}></div>
        </section>
      </div>
    );
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
};

export default Map;
