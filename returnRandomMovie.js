const chalk = require('chalk');
const ora = require('ora');
const rpn = require('request-promise-native');

const returnRandomMovie = () => {

    // Returns a promise with a title

    return new Promise((resolve, reject) => {
        console.log(
            `You requested a random movie.`
          );
          const spinner = ora('Fetching list of movies from IMDB...').start();
        
          const options = {
            method: 'GET',
            uri: 'www.imdb.com'
          };
        
          rpn(options)
            .then(response => {
                spinner.text = 'Movie found.';
                spinner.succeed();
              console.log("response", JSON.parse(response));
            })
            .catch(e => {
              spinner.text = 'Request completed.';
              spinner.fail();
              console.log(`Sorry, I couldn't fetch a random film.`);
            });

    })
    
};

module.exports = returnMovieInfo;
