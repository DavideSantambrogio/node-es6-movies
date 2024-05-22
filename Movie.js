class Movie {
    constructor(title, year, genre, rating) {
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.rating = rating;
        this.type = "movie";
    }

    toString() {
        return `${this.title} è un film di genere ${this.genre}. È stato rilasciato nel ${this.year} ed ha un voto di ${this.rating}.`;
    }
}

module.exports = Movie;
