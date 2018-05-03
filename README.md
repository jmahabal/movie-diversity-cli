# [Movie Gender Diversity CLI](https://github.com/jmahabal/movie-diversity-cli)

This is a CLI tool for determining the breakdown by gender of various movies. I
grab the data from [the Movie DB](themoviedb.org), a website similar to IMDB but
with an API.

# How to use it

You can install the application from npm with the command `npm install
movie-diversity-cli -g`.
<img width="640" src="https://raw.githubusercontent.com/jmahabal/movie-diversity-cli/master/images/download.png" alt="Download Instructions">

Then to actually use the script you can call it by `movie-diversity "movie
name"`. If you're searching for a movie with multiple words in the title you'll
need to surround the title with quotes.
<img width="640" src="https://raw.githubusercontent.com/jmahabal/movie-diversity-cli/master/images/example.png" alt="Example Call">

Here's an example response you might get:
<img width="640" src="https://raw.githubusercontent.com/jmahabal/movie-diversity-cli/master/images/result.png" alt="Result">

If you don't want to install it globally you can use `npx` to create a temporary
install: `npx movie-diversity-cli "movie name"`.

<img width="640" src="https://raw.githubusercontent.com/jmahabal/movie-diversity-cli/master/images/npx.png" alt="Using npx">

# How it works

The process of creating an 'analysis' kicks off with a movie title. This title
is fed into the MovieDB search API after which the bot selects the first movie
listed. Once there is a movie associated with the request, the program grabs the
cast members and aggregates the genders of the first 20 cast members. The cast
members are billed according to importance, so choosing the top 20 should lead
to a accurate study, as minor characters with little screen time are not as
relevant (though definitely still important!) The output distribution is then
displayed to the user.

This CLI makes a call to an Amazon Lambda function, which where the above
process runs. You can see code for that process under `lambda/`. If you do
decide to run the Lambda code, you'll need to grab your own API key from the
MovieDB.

# The future

* Expand analysis to include ethnicity information as well, in addition to other
  groups
* Have more detailed error messages, including ones for when the movie was
  actually found, but did not have enough cast members for an analysis

# Credits

I'd like to thank Tim Pettersen for their
[tutorial](https://developer.atlassian.com/blog/2015/11/scripting-with-node/) on
how to build a CLI tool in Node. Also, thank you again to
[The Movie DB](https://www.themoviedb.org/documentation/api) for providing such
a great API.

![The Movie DB](themoviedb.png)
