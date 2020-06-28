import React, {PureComponent, createRef} from "react";
import leaflet from "leaflet";
// import PropTypes from "prop-types";

const cityAmsterdam = [52.38333, 4.9];
const zoom = 12;
const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [27, 39],
});
const offerCords = [52.3709553943508, 4.89309666406198];

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
  }

  _addMarkers(map) {
    leaflet
      .marker(offerCords, {icon})
      .addTo(map);
  }

  componentDidMount() {
    const mapRef = this._mapRef.current;

    const map = leaflet.map(mapRef, {
      center: cityAmsterdam,
      zoom,
      zoomControl: false,
      marker: true,
    });

    map.setView(cityAmsterdam, zoom);

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

};

export default Map;
