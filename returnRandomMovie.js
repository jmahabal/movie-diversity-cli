const ora = require("ora");
const rpn = require("request-promise-native");

const movieTitleColor = require("./chalkSettings").movieTitleColor;

// This URL was created using Datasette, a convenient way to host .csv files and expose a JSON API
// A great feature is the ability to run a SQL query before fetching the results
// In this case, we'll use it to filter out movies older than, say, 1975 since they might not have the needed data

const topMoviesURI =
  "https://datasette-rnfchsmpdy.now.sh/csv-data-260033e.json?sql=select+*+from+movies+where+Year+%3E+1975";

const returnRandomMovie = () => {
  // Resolve the promise with the title of a random movie
  return new Promise((resolve, reject) => {
    const spinner = ora("Getting a random movie...").start();

    const options = {
      method: "GET",
      uri: topMoviesURI
    };

    rpn(options)
      .then(response => {
        const movies = JSON.parse(response).rows;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        spinner.text = `Random movie found: ${movieTitleColor.underline(
          randomMovie[0]
        )} (${movieTitleColor(randomMovie[1])})`;
        spinner.succeed();
        resolve(randomMovie[0]);
      })
      .catch(e => {
        spinner.text = `Could not get a random movie: ${e}`;
        spinner.fail();
        reject(`Sorry, I couldn't fetch a random film.`);
      });
  });
};

module.exports = returnRandomMovie;
