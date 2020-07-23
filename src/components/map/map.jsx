import React, {Component, createRef} from "react";
import leaflet from "leaflet";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getActiveOffer, getCity, getCityDetails} from "../../reducer/filters/selectors.js";

const iconInactive = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [27, 39],
});

const iconActive = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [27, 39],
});

class Map extends Component {
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

  _createMap(mapRef) {
    const {coordinates, zoom} = this.props.cityDetails;

    this._map = leaflet.map(mapRef, {
      center: coordinates,
      zoom,
      zoomControl: false,
      marker: true,
    });
  }

  _setMapView() {
    const {coordinates, zoom} = this.props.cityDetails;
    this._map.setView(coordinates, zoom);
  }

  _addTileLayer(map) {
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.city !== nextProps.city) {
      return true;
    }

    if (!this.props.activeCard && nextProps.activeCard) {
      return true;
    }

    if (this.props.activeCard && !nextProps.activeCard) {
      return true;
    }

    if (this.props.activeCard && nextProps.activeCard) {
      if (this.props.activeCard.id !== nextProps.activeCard.id) {
        return true;
      }
    }

    const currentOffers = this.props.offers;
    const newOffers = nextProps.offers;

    if (currentOffers.length !== newOffers.length) {
      return true;
    } else {
      for (let index = 0; index < currentOffers.length; index++) {
        if (currentOffers[index].id !== newOffers[index].id) {
          return true;
        }
      }
    }

    return false;
  }

  componentDidMount() {
    const mapRef = this._mapRef.current;

    this._createMap(mapRef);
    this._setMapView();
    this._addTileLayer(this._map);
    this._addMarkers(this._map);
  }

  render() {
    const {mapStyle} = this.props;

    return (
      <section className={`${mapStyle} map`}>
        <div id="map" style={{height: `100%`}} ref={this._mapRef}></div>
      </section>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      this._clearMarkers();
      this._setMapView();
      this._addMarkers(this._map);
    } else {
      this._clearMarkers();
      this._addMarkers(this._map, this.props.activeCard);
    }
  }
}

Map.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        city: PropTypes.shape({
          name: PropTypes.string.isRequired,
          coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
          zoom: PropTypes.number.isRequired,
        }),
        coordinates: PropTypes.arrayOf(
            PropTypes.number
        ).isRequired,
      }).isRequired
  ).isRequired,
  activeCard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
  }),
  mapStyle: PropTypes.string.isRequired,
  cityDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(
        PropTypes.number.isRequired
    ).isRequired,
    zoom: PropTypes.number.isRequired,
  })
};

const mapStateToProps = (state, ownProps) => ({
  city: getCity(state),
  cityDetails: getCityDetails(state),
  activeCard: ownProps.activeCard || getActiveOffer(state),
});

export {Map};
export default connect(mapStateToProps, null)(Map);
