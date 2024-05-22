// movie.js
class Movie {
    #title;
    #year;
    #genre;
    #rating;
    #type;

    constructor(title, year, genre, rating) {
        this.#title = title;
        this.#year = year;
        this.#genre = genre;
        this.#rating = rating;
        this.#type = "movie";
    }

    get title() {
        return this.#title;
    }

    get year() {
        return this.#year;
    }

    get genre() {
        return this.#genre;
    }

    get rating() {
        return this.#rating;
    }

    get type() {
        return this.#type;
    }

    toString() {
        return `${this.#title} è un film di genere ${this.#genre}. È stato rilasciato nel ${this.#year} ed ha un voto di ${this.#rating}.`;
    }
}

module.exports = Movie;
