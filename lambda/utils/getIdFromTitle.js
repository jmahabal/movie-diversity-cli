const rpn = require("request-promise-native");

// get the movie db id of a movie given its title
const getIdFromTitle = function(movieTitle, apikey) {
  return new Promise((resolve, reject) => {
    let baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=`;
    rpn
      .get(baseUrl + movieTitle.split(" ").join("+"))
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

module.exports = getIdFromTitle;
