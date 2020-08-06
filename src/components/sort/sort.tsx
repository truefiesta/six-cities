import * as React from "react";
import {SortType, KeyCode} from "../../const";
import withOpenFlag from "../../hocs/with-open-flag/with-open-flag";

interface Props {
  isOpen: boolean;
  currentSortType: number;
  onOpenStateToggle: () => void;
  onClose: () => void;
  onSortTypeChange: (sortType: number) => void;
}

const SortTypeTitle = {
  [SortType.POPULAR]: `Popular`,
  [SortType.PRICE_LOW_TO_HIGH]: `Price: low to high`,
  [SortType.PRICE_HIGH_TO_LOW]: `Price: high to low`,
  [SortType.TOP_RATED_FIRST]: `Top rated first`,
};

const Sort: React.FunctionComponent<Props> = (props: Props) => {
  const {isOpen, onOpenStateToggle, onClose, currentSortType, onSortTypeChange} = props;
  const sortTypes: number[] = Object.values(SortType);

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
        &nbsp;{SortTypeTitle[currentSortType]}
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
              {SortTypeTitle[sortType]}
            </li>
          );
        })}
      </ul>
    </form>
  );
};

export {Sort};
export default withOpenFlag(Sort);
