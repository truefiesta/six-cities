import React, {PureComponent, createRef} from "react";
import leaflet from "leaflet";
import {CityCoordinates} from "../../const.js";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getActiveOffer, getCity} from "../../selectors.js";

const ZOOM = 12;
const iconInactive = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [27, 39],
});

const iconActive = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [27, 39],
});

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._markers = null;
    this._mapRef = createRef();
  }

  _addMarkers(map, activeCard) {
    const {offers} = this.props;
    this._markers = leaflet.layerGroup();
    let icon = iconInactive;

    offers.forEach((offer) => {
      if (activeCard) {
        icon = (offer.id === this.props.activeCard.id) ? iconActive : iconInactive;
      }

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

    if (prevProps.activeCard !== this.props.activeCard) {
      this._clearMarkers();
      this._addMarkers(this._map, this.props.activeCard);
    }
  }
}

Map.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(
            PropTypes.number
        ).isRequired,
      }).isRequired
  ).isRequired,
  activeCard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  activeCard: getActiveOffer(state),
});

export {Map};
export default connect(mapStateToProps, null)(Map);
