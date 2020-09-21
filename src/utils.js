// These functions create arrays that will populate our state in SpinForm
export const generateYearArray = () => {
  // Creates an array of genres in order to populate the dropdown lists
  let currentYear = new Date().getFullYear();
  let firstYear = 1920;
  let years = [];

  for (let i = firstYear; i <= currentYear; i++) {
    years.push({ key: i, value: i, text: i });
  }
  return years;
};

export const generateReversedYearArray = () => {
  // Creates an array of genres in order to populate the dropdown lists
  let currentYear = new Date().getFullYear();
  let firstYear = 1920;
  let years = [];

  for (let i = firstYear; i <= currentYear; i++) {
    years.push({ key: i, value: i, text: i });
  }
  return years.reverse();
};

export const generateRatingArray = () => {
  // Creates an indexed array for ratings.
  // TMDB expects an integer
  let ratingsArray = [];

  for (let i = 1; i <= 10; i++) {
    ratingsArray.push({ key: i, value: i, text: `${i} / 10` });
  }
  return ratingsArray;
};

// Genereates a string to be used in our params object
export const generateDateString = (yearFrom, yearTo) => {
  let lowYear = yearFrom <= yearTo ? yearFrom : yearTo;
  let highYear = yearFrom >= yearTo ? yearFrom : yearTo;

  let dateFrom = `${lowYear}-01-01`;

  let dateTo = `${highYear}-12-31`;

  return { dateFrom, dateTo };
};
