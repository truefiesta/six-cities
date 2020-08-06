import moment from "moment";

export const convertStarRatingToWidthPercent = (rating) => {
  return Math.round(rating) * 20;
};

export const capitalize = (text) => {
  if (typeof text !== `string`) {
    return ``;
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatDate = (date) => {
  return moment(date, `YYYY-MM-DD`).format(`MMMM YYYY`);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const sortReviewsByDate = (reviews) => {
  return reviews.sort((reviewA, reviewB) => {
    const isSameDate = moment(reviewB.date) - moment(reviewA.date) === 0;
    if (isSameDate) {
      return reviewB.id - reviewA.id;
    } else {
      return moment(reviewB.date) - moment(reviewA.date);
    }
  });
};
