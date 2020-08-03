// These functions create arrays that will populate our state in SpinForm
export const generateYearArray = () => {
  // Creates an array of genres in order to populate the dropdown lists
  let currentYear = new Date().getFullYear();
  let firstYear = 1920;
  let years = [];

  for (let i = firstYear; i <= currentYear; i++) {
    years.push({ id: i, value: i });
  }
  return years;
};

export const generateRatingArray = () => {
  // Creates an indexed array for ratings.
  // TMDB expects an integer
  let ratingsArray = [];

  for (let i = 1; i <= 10; i++) {
    ratingsArray.push({ id: i, value: `${i}0%` });
  }
  return ratingsArray;
};
