const rpn = require('request-promise-native');
const _ = require('lodash');
const castLimit = 20;

// Get ID of a Movie given it's title
const getID = function(movieTitle, apikey) {
  return new Promise((resolve, reject) => {
    let baseUrl =
      'https://api.themoviedb.org/3/search/movie?api_key=' + apikey + '&query=';
    rpn
      .get(baseUrl + movieTitle.split(' ').join('+'))
      .then(response => {
        let movie = JSON.parse(response).results[0];
        resolve({
          id: movie.id,
          title: movie.title,
          releaseDate: movie.release_date
        });
      })
      .catch(() => {
        reject(`I could not find film information for "${movieTitle}".`);
      });
  });
};

// Given a cast member, get gender
const determineGender = function(gender) {
  if (gender === 1) {
    return 'Women';
  } else if (gender === 2) {
    return 'Men';
  }
  return 'Unknown';
};

// Given a movie title, return it's cast members
const getCastFromId = function(movieId, apikey) {
  return new Promise((resolve, reject) => {
    let baseUrl =
      'https://api.themoviedb.org/3/movie/' +
      movieId +
      '?append_to_response=credits&api_key=' +
      apikey;
    rpn
      .get(baseUrl)
      .then(response => {
        if (JSON.parse(response).credits.cast.length >= castLimit) {
          resolve(
            _.countBy(
              JSON.parse(response)
                .credits.cast.splice(0, castLimit)
                .map(x => determineGender(x.gender))
            )
          );
        }
        reject(
          `I could not gather enough information on the cast members of this film.`
        );
      })
      .catch(() => {
        reject(`I could not find this film.`);
      });
  });
};

exports.handler = function(event, context) {
  const title = event.queryStringParameters.title;
  getID(title, process.env.moviedb_apikey).then(movie => {
    getCastFromId(movie.id, process.env.moviedb_apikey).then(genders => {
      var response = {
        statusCode: 200,
        body: JSON.stringify({ movie: movie, genders: genders })
      };
      context.done(null, response);
    });
  });
};
