#!/usr/bin/env node
// index.js

const program = require("commander");

// Functions for getting the movie information

const returnMovieInfo = require("./returnMovieInfo");
const returnRandomMovie = require("./returnRandomMovie");

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
  .description("get the results back for a random top 100 movie")
  .action(() => console.log("random"));

program
  .command("help")
  .description("outputs from the --help function")
  .action(() => program.help());

program.parse(process.argv);

if (!program.args.length) {
  console.log("Selecting a random movie for you.");
}
