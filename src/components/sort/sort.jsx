import React from "react";
import PropTypes from "prop-types";
import {SortType, KeyCode} from "../../const.js";
import withOpenFlag from "../../hocs/with-open-flag/with-open-flag.js";

const SortTypeTitles = {
  [SortType.POPULAR]: `Popular`,
  [SortType.PRICE_LOW_TO_HIGH]: `Price: low to high`,
  [SortType.PRICE_HIGH_TO_LOW]: `Price: high to low`,
  [SortType.TOP_RATED_FIRST]: `Top rated first`,
};

const Sort = (props) => {
  const {isOpen, onOpenStateToggle, onClose, currentSortType, onSortTypeChange} = props;
  const sortTypes = Object.values(SortType);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={onOpenStateToggle}
        onKeyDown={(evt) => {
          if (evt.keyCode === KeyCode.SPACEBAR) {
            onOpenStateToggle();
          }
        }}
        role="button"
      >
        &nbsp;{SortTypeTitles[currentSortType]}
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
                onClose();
              }}
              onKeyDown={(evt) => {
                if (evt.keyCode === KeyCode.ENTER) {
                  onSortTypeChange(sortType);
                  onClose();
                }
              }}
              role="button"
            >
              {SortTypeTitles[sortType]}
            </li>
          );
        })}
      </ul>
    </form>
  );
};

Sort.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  currentSortType: PropTypes.number.isRequired,
  onOpenStateToggle: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
};

export {Sort};
export default withOpenFlag(Sort);
