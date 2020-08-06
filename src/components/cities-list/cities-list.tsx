import * as React from "react";
import {connect} from "react-redux";
import {getCities} from "../../reducer/offers/selectors";
import {getCity} from "../../reducer/filters/selectors";
import CityLink from "../city-link/city-link";

interface Props {
  city: string;
  cities: Array<string>;
}

const CitiesList: React.FunctionComponent<Props> = (props: Props) => {
  const {city, cities} = props;
  if (!city) {
    return null;
  }

  const sixCities = cities.slice(0, 6);

  return (
    <ul className="locations__list tabs__list">
      {sixCities.map((it) => {
        return (
          <li key={it} className="locations__item">
            <CityLink
              city={it}
              isActive={city === it}
              isTab={true}
            />
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  cities: getCities(state),
});

export {CitiesList};
export default connect(mapStateToProps)(CitiesList);
