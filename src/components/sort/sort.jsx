import React from "react";
import PropTypes from "prop-types";
import {SortTypes, KeyCodes} from "../../const.js";

const Sort = (props) => {
  const sortTypes = Object.values(SortTypes);
  const {isOpen, onComponentClick, onComponentChildClick, currentSortType, onSortTypeChange} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => onComponentClick()}
        onKeyDown={(evt) => {
          if (evt.keyCode === KeyCodes.SPACEBAR) {
            onComponentClick();
          }
        }}
        role="button"
      >
        &nbsp;{currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`}
      >
        {sortTypes.map((sortType) => {
          return (
            <li
              key={sortType}
              className={`places__option ${currentSortType === sortType ? `places__option--active` : ``}`}
              tabIndex={0}
              onClick={() => {
                onSortTypeChange(sortType);
                onComponentClick();
              }}
              onKeyDown={(evt) => {
                if (evt.keyCode === KeyCodes.ENTER) {
                  onSortTypeChange(sortType);
                  onComponentChildClick();
                }
              }}
              role="button"
            >
              {sortType}
            </li>
          );
        })}
      </ul>
    </form>
  );
};

Sort.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onComponentClick: PropTypes.func.isRequired,
  onComponentChildClick: PropTypes.func.isRequired,
  currentSortType: PropTypes.oneOf([
    SortTypes.POPULAR, SortTypes.PRICE_LOW_TO_HIGH, SortTypes.PRICE_HIGH_TO_LOW, SortTypes.TOP_RATED_FIRST
  ]).isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
};

export default Sort;
