const axios = require("axios");

module.exports = (app) => {

app.route("/").
  get((req, res) => {
    res.render(process.cwd() + "/views/index");
  });

app.route("/search").
  post((req, res) => {
    axios.get("http://www.omdbapi.com/?s=" + req.body.searchText + "&apikey=" + process.env.OMDB_KEY).
      then((movies) => {
        res.render(process.cwd() + "/views/results", {movieData: movies.data.Search});
      }).
      catch((err) => {
        console.error(err);
        res.render("/results", {
          movieData: null,
          errMessage: "No movies match your search, please try again"
        });
      })
  })

app.route("/results").
  get((req, res) => {
    res.render(process.cwd() + "/views/results");
  })

app.route("/movie/:id").
  get((req, res) => {
    //removing a semicolon from the returned id
    const id = req.params.id.substring(1);
    axios.get("http://www.omdbapi.com/?i=" + id + "&apikey=" + process.env.OMDB_KEY).
      then((movie) => {
        res.render(process.cwd() + "/views/movie", {movieDetails: movie.data});
      }).
      catch((err) => {
        console.error(err);
      })
  });

}
