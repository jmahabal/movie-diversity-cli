// this function runs everytime the cli hits the lambda endpoint
// the motivation for keeping this in a lambda function is to protect the api key

// number of cast members to consider
const castLimit = 20;

const getIdFromTitle = require('./utils/getIdFromTitle');
const getCastFromId = require('./utils/getCastFromId');

exports.handler = function(event, context) {
  const title = event.queryStringParameters.title;
  getIdFromTitle(title, process.env.moviedb_apikey).then(movie => {
    getCastFromId(movie.id, castLimit, process.env.moviedb_apikey).then(genders => {
      var response = {
        statusCode: 200,
        body: JSON.stringify({ movie: movie, genders: genders })
      };
      context.done(null, response);
    });
  });
};

// a helpful tip to debug this function is to run from the command line:
// node -e 'require("./index.js").handler()'
// making sure to replace the context and event variables