import * as React from "react";
import * as leaflet from "leaflet";
import {connect} from "react-redux";
import {getActiveOffer, getCity, getCityDetails} from "../../reducer/filters/selectors";
import {MapType} from "../../const";
import {Offer, CityDetails} from "../../types";

interface Props {
  city: string;
  offers: Offer[];
  activeCard: Offer;
  mapType: string;
  cityDetails: CityDetails;
}

const iconInactive = leaflet.icon({
  iconUrl: `/img/pin.svg`,
  iconSize: [27, 39],
});

const iconActive = leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [27, 39],
});

class Map extends React.Component<Props> {
  private _mapRef: React.RefObject<HTMLDivElement>;
  private _map = leaflet.Map;
  private _markers = leaflet.LayerGroup;

  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
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
    this._createMap(this._mapRef.current);
    this._setMapView();
    this._addTileLayer();
    this._addMarkers();
  }

  componentDidUpdate(prevProps) {
    this._createMap(this._mapRef.current);
    if (prevProps.city !== this.props.city) {
      this._clearMarkers();
      this._setMapView();
      this._addMarkers();
    } else {
      this._clearMarkers();
      this._addMarkers();
    }
  }

  _addMarkers() {
    if (!this._map) {
      return;
    }

    const {offers} = this.props;
    this._markers = leaflet.layerGroup();
    let icon = iconInactive;

    offers.forEach((offer) => {
      if (this.props.activeCard) {
        icon = (offer.id === this.props.activeCard.id) ? iconActive : iconInactive;
      }

      leaflet
        .marker(offer.coordinates, {icon})
        .addTo(this._markers);
    });

    this._markers.addTo(this._map);
  }

  _clearMarkers() {
    if (this._markers) {
      this._markers.clearLayers();
    }
  }

  _createMap(mapRef) {
    if (!this.props.cityDetails) {
      return;
    }

    if (this._map) {
      return;
    }

    const {coordinates, zoom} = this.props.cityDetails;

    this._map = leaflet.map(mapRef, {
      center: coordinates,
      zoom,
      zoomControl: false,
      marker: true,
    });
  }

  _setMapView() {
    if (!this.props.cityDetails) {
      return;
    }

    if (!this._map) {
      return;
    }

    const {coordinates, zoom} = this.props.cityDetails;
    this._map.setView(coordinates, zoom);
  }

  _addTileLayer() {
    if (!this._map) {
      return;
    }

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);
  }

  render() {
    const {mapType} = this.props;

    let mapClass = ``;
    if (mapType === MapType.MAIN) {
      mapClass = `cities__map`;
    } else if (mapType === MapType.DETAILS) {
      mapClass = `property__map`;
    }

    return (
      <section className={`${mapClass} map`}>
        <div id="map" style={{height: `100%`}} ref={this._mapRef}></div>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  city: getCity(state),
  cityDetails: getCityDetails(state),
  activeCard: ownProps.activeCard || getActiveOffer(state),
});

export {Map};
export default connect(mapStateToProps, null)(Map);
