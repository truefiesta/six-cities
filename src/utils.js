export const convertStarRatingToWidthPercent = (rating) => {
  return Math.round(rating) * 20;
};

export const capitalize = (text) => {
  if (typeof text !== `string`) {
    return ``;
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
