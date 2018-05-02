const chalk = require("chalk");
const ora = require("ora");
const rpn = require("request-promise-native");

const movieTitleColor = require("./chalkSettings").movieTitleColor;
const linkColor = require("./chalkSettings").linkColor;

const lambdaURL =
  "https://zyamfb8bg5.execute-api.us-west-1.amazonaws.com/prod/getDiversity";

const returnMovieInfo = title => {
  const spinner = ora(
    `Fetching diversity information about “${title}”...`
  ).start();

  const options = {
    method: "GET",
    uri: lambdaURL,
    qs: {
      title: title
    }
  };

  rpn(options)
    .then(response => {
      response = JSON.parse(response);
      const genders = response.genders;
      const movie = response.movie;
      const year = response.movie.releaseDate.split("-")[0];
      spinner.text = "I was able to get diversity information.";
      spinner.succeed();
      console.log(`  Women: ${"👩🏽 ".repeat(genders.Women)}`);
      console.log(`    Men: ${"👨🏽 ".repeat(genders.Men)}`);
      console.log(`Unknown: ${"🎥 ".repeat(genders.Unknown)}`);
      console.log(
        `You can find more information about ${movieTitleColor.underline(
          movie.title
        )} (${movieTitleColor(year)}) at ${linkColor(
          `https://www.themoviedb.org/movie/${movie.id}`
        )}.`
      );
    })
    .catch(e => {
      spinner.text = `Sorry, I was not able to get diversity information about the movie.`;
      spinner.fail();
    });
};

module.exports = returnMovieInfo;
