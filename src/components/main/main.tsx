import * as React from "react";
import {connect} from "react-redux";
import {getSortedCityOffers} from "../../reducer/filters/selectors";
import {MapType} from "../../const";
import {Offer} from "../../types";
import Header from "../header/header";
import Map from "../map/map";
import NoOffers from "../no-offers/no-offers";
import CitiesList from "../cities-list/cities-list";
import Cities from "../cities/cities";

interface Props {
  sortedCityOffers: Offer[];
}

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {sortedCityOffers} = props;
  const isNoOffers = sortedCityOffers.length === 0 ? true : false;

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={`page__main page__main--index ${isNoOffers ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList/>
          </section>
        </div>
        <div className="cities">
          {isNoOffers
            ? <NoOffers/>
            : <div className="cities__places-container container">
              <Cities/>
              <div className="cities__right-section">
                <Map
                  mapType={MapType.MAIN}
                  offers={sortedCityOffers}
                />
              </div>
            </div>
          }
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sortedCityOffers: getSortedCityOffers(state),
});

export {Main};
export default connect(mapStateToProps, null)(Main);
