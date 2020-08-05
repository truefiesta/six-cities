import * as React from "react";
import PropTypes from "prop-types";

const Stars = (props) => {
  const {setName, setOptions, selectedOption, onSelectedOptionChange, isBlocked} = props;
  const reversedOptions = setOptions.slice().reverse();

  return (
    <div className="reviews__rating-form form__rating">
      {reversedOptions.map((option, index, options) => {

        const id = options.length - index;
        const isChecked = selectedOption === id;

        return (
          <React.Fragment key={id}>
            <input
              className="form__rating-input visually-hidden"
              name={setName}
              value={id}
              id={`${id}-stars`}
              type="radio"
              checked={isChecked}
              onChange={(evt) => {
                const formattedRating = parseInt(evt.target.value, 10);
                onSelectedOptionChange(formattedRating);
              }}
              disabled={isBlocked}
            />
            <label htmlFor={`${id}-stars`} className="reviews__rating-label form__rating-label" title={option}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};

Stars.propTypes = {
  setName: PropTypes.string.isRequired,
  setOptions: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
  selectedOption: PropTypes.number.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  onSelectedOptionChange: PropTypes.func.isRequired,
};

export default Stars;
