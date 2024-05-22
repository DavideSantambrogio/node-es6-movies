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

    // Metodo statico per calcolare la media dei voti dei film per un determinato genere
    static calculateAverageRatingByGenre(filmList, genre) {
        // Filtra la lista dei film per il genere specificato
        const filmsByGenre = filmList.filter(film => film.genre === genre && film.type === "movie");

        // Se non ci sono film del genere specificato, restituisci un messaggio di errore
        if (filmByGenere.length === 0) {
            return "Nessun film trovato per il genere specificato.";
        }

        // Calcola la somma dei voti dei film
        const sumOfRatings = filmsByGenre.reduce((acc, film) => acc + film.rating, 0);

        // Calcola la media dei voti
        const averageRating = sumOfRatings / filmsByGenre.length;
        // Restituisci la media dei voti formattata
        return averageRating.toFixed(1); // Arrotonda la media a una cifra decimale
    }
}

module.exports = Movie;
