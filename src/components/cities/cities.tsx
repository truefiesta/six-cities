import * as React from "react";
import {OfferCardType} from "../../const";
import {connect} from "react-redux";
import {getCurrentSortType, getSortedCityOffers, getCity} from "../../reducer/filters/selectors";
import {ActionCreator as FiltersActionCreator} from "../../reducer/filters/filters";
import {Offer} from "../../types";
import OffersList from "../offers-list/offers-list";
import Sort from "../sort/sort";

interface Props {
  city: string;
  currentSortType: number;
  sortedCityOffers: Offer[];
  onSortTypeChange: () => void;
  onActiveCardChange: () => void;
}

const Cities: React.FunctionComponent<Props> = (props: Props) => {
  const {city, currentSortType, sortedCityOffers, onSortTypeChange, onActiveCardChange} = props;
  const offersCount = sortedCityOffers.length;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offersCount} places to stay in {city}</b>
      <Sort
        currentSortType={currentSortType}
        onSortTypeChange={onSortTypeChange}
      />
      <OffersList
        cardType={OfferCardType.MAIN}
        onActiveCardChange={onActiveCardChange}
        offers={sortedCityOffers}
      />
    </section>
  );
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  currentSortType: getCurrentSortType(state),
  sortedCityOffers: getSortedCityOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSortTypeChange(sortType) {
    dispatch(FiltersActionCreator.changeSortType(sortType));
  },
  onActiveCardChange(offer) {
    dispatch(FiltersActionCreator.changeActiveCard(offer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
