# [Movie Gender Diversity CLI](https://github.com/jmahabal/movie-diversity-cli)

This is a CLI tool for determining the breakdown by gender of various movies. I
grab the data from [the Movie DB](themoviedb.org), a website similar to IMDB but
with an API.

# How to use it

First, install the application from npm:

`npm install movie-diversity-cli`

Then,

![Example Call](example.png)

You can also `git clone https://github.com/jmahabal/movie-diversity-cli.git` and
then run `npm install`.

# How it works

The process of creating an 'analysis' kicks off with a movie title. This title
is fed into the MovieDB search API, after which the bot selects the movie that
is the first result. Once there is a movie associated with the request, the
function grabs the cast members and aggregates the genders of the first 20 cast
members. The cast members are billed accordingly to importance, so choosing the
top 20 should lead to a accurate study, as minor characters with little screen
time are not as relevant (though definitely still important!) The output
distribution is then displayed to the user.

This CLI makes a call to an Amazon Lambda URL, where the above process runs.

# The future

* Expand analysis to include ethnicity information as well, in addition to other
  groups
* Automate uploading to AWS, allowing for others to contribute to that function

# Credits

![The Movie DB](themoviedb.png)

[The Movie DB](https://www.themoviedb.org/documentation/api)
