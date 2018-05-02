const chalk = require("chalk");
const ora = require("ora");
const rpn = require("request-promise-native");
const lambdaURL =
  "https://zyamfb8bg5.execute-api.us-west-1.amazonaws.com/prod/getDiversity";

const returnMovieInfo = title => {
  console.log(`You requested diversity information for “${title}”.`);
  const spinner = ora("Fetching information...").start();

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
      spinner.text = "Request completed.";
      spinner.succeed();
      console.log(`  Women: ${"👩🏽 ".repeat(genders.Women)}`);
      console.log(`    Men: ${"👨🏽 ".repeat(genders.Men)}`);
      console.log(`Unknown: ${"🎥 ".repeat(genders.Unknown)}`);
      console.log(
        `You can find more information about ${chalk
          .rgb(180, 15, 32)
          .underline(movie.title)} (${chalk.rgb(180, 15, 32)(
          year
        )}) at ${chalk.blue(`https://www.themoviedb.org/movie/${movie.id}`)}.`
      );
    })
    .catch(e => {
      spinner.text = "Request completed.";
      spinner.fail();
      console.log(`Sorry, I couldn't find information for that film.`);
    });
};

module.exports = returnMovieInfo;
