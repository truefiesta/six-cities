import * as React from "react";
import {connect} from "react-redux";
import {ActionCreator as FiltersActionCreator} from "../../reducer/filters/filters";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

interface Props {
  city: string;
  isActive: boolean;
  isTab: boolean;
  onCityClick: (city: string) => void;
}

const CityLink: React.FunctionComponent<Props> = (props: Props) => {
  const {city, isActive = false, isTab = false, onCityClick} = props;
  const tabClass = isTab ? `tabs__item` : ``;
  const activeCityClass = isActive ? `tabs__item--active` : ``;

  return (
    <Link
      to={AppRoute.ROOT}
      onClick={() => {
        onCityClick(city);
      }}
      className={`locations__item-link ${tabClass} ${activeCityClass}`}
    >
      <span>{city}</span>
    </Link>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(FiltersActionCreator.changeCity(city));
  }
});

export {CityLink};
export default connect(null, mapDispatchToProps)(CityLink);
