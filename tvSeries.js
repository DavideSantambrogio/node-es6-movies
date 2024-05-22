const Movie = require("./movie");

class TvSerie extends Movie {
    constructor(title, year, genre, rating, seasons) {
        super(title, year, genre, rating); // Chiamiamo il costruttore della classe padre Movie
        this.seasons = seasons;
        this.type = "tv";
    }
}

module.exports = TvSerie;
