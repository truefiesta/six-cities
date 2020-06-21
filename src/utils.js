export const convertStarRatingToWidthPercent = (rating) => {
  const starRatingPercents = [0, 20, 40, 60, 80, 100];
  const percentIndex = Math.round(rating);

  return starRatingPercents[percentIndex];
};

export const capitalize = (text) => {
  if (typeof text !== `string`) {
    return ``;
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
