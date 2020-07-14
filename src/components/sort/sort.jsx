import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SortTypes} from "../../const.js";

class Sort extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  _handleOpen() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    const sortTypes = Object.values(SortTypes);
    const {currentSortType, onSortTypeChange} = this.props;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex="0"
          onClick={() => this._handleOpen()}
        >
          &nbsp;{currentSortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul
          className={`places__options places__options--custom ${this.state.isOpen ? `places__options--opened` : ``}`}
        >
          {sortTypes.map((sortType) => {
            return (
              <li
                key={sortType}
                className={`places__option ${currentSortType === sortType ? `places__option--active` : ``}`}
                tabIndex="0"
                onClick={() => {
                  onSortTypeChange(sortType);
                  this._handleOpen();
                }}
              >
                {sortType}
              </li>
            );
          })}
        </ul>
      </form>
    );
  }
}

Sort.propTypes = {
  currentSortType: PropTypes.oneOf([
    SortTypes.POPULAR, SortTypes.PRICE_LOW_TO_HIGH, SortTypes.PRICE_HIGH_TO_LOW, SortTypes.TOP_RATED_FIRST
  ]).isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
};

export default Sort;
