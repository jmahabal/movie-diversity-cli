const rpn = require("request-promise-native");
const _ = require("lodash");

const determineGender = require("./determineGender");

// given a movie title, return its cast members
const getCastFromId = function(movieId, castLimit, apikey) {
  return new Promise((resolve, reject) => {
    let baseUrl = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&api_key=${apikey}`;
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

module.exports = getCastFromId;
