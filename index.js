#!/usr/bin/env node
// index.js

const program = require("commander");

// Functions for getting the movie information

const returnMovieInfo = require("./utils/returnMovieInfo");
const returnRandomMovie = require("./utils/returnRandomMovie");

const handleRandomMovie = () => {
  returnRandomMovie()
    .then(response => returnMovieInfo(response))
    .catch(error => {
      // console.log(error);
    });
};

// CLI program

program
  .version("0.0.1")
  .description("A CLI for determining the gender diversity of a movie");

program
  .command("get <title>")
  .description("search for a specific movie")
  .action(title => returnMovieInfo(title));

program
  .command("random")
  .description("get the results back for a random, popular movie")
  .action(() => handleRandomMovie());

program
  .command("help")
  .description("equivalent to --help")
  .action(() => program.help());

program.parse(process.argv);

if (!program.args.length) {
  handleRandomMovie();
}
