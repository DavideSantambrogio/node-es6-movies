const Movie = require("./movie");

class TvSerie extends Movie {
    constructor(title, year, genre, rating, seasons) {
        super(title, year, genre, rating); // Chiamiamo il costruttore della classe padre Movie
        this.seasons = seasons;
        this.type = "tv";
    }

    toString() {
        return `${this.title} è una serie tv di genere ${this.genre}. La prima stagione è stata rilasciata nel ${this.year} ed in totale sono state prodotte ${this.seasons} stagioni. Ha un voto di ${this.rating}.`;
    }
}

module.exports = TvSerie;
