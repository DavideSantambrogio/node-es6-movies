const http = require("http");
const dotenv = require('dotenv');
const Movie = require("./movie");
const TvSerie = require("./tvSeries");
const mediaLibrary = require("./mediaLibrary");

// Funzione per ottenere la lista di tutti i generi dei film senza ripetizioni
function getUniqueGenres(movieList) {
    const genres = new Set(); // Utilizziamo un Set per garantire che i generi non si ripetano
    movieList.forEach(movie => genres.add(movie.genre)); // Aggiungiamo ogni genere alla lista dei generi
    return Array.from(genres); // Convertiamo il Set in un array per poterlo utilizzare facilmente
}

// Funzione per calcolare la media dei voti dei film per un determinato genere
function calculateAverageRatingByGenre(filmList, genre) {
    // Filtra la lista dei film per il genere specificato
    const filmsByGenre = filmList.filter(film => film.genre === genre && film.type === "movie");

    // Se non ci sono film del genere specificato, restituisci un messaggio di errore
    if (filmsByGenre.length === 0) {
        return "Nessun film trovato per il genere specificato.";
    }

    // Calcola la somma dei voti dei film
    const sumOfRatings = filmsByGenre.reduce((acc, film) => acc + film.rating, 0);

    // Calcola la media dei voti
    const averageRating = sumOfRatings / filmsByGenre.length;

    // Restituisci la media dei voti formattata
    return averageRating.toFixed(1); // Arrotonda la media a una cifra decimale
}

// Funzione per filtrare i film in base al genere e ritornare un array con i risultati di toString()
function filterMoviesByGenre(movieList, genre) {
    return movieList.filter(movie => movie.type === "movie" && movie.genre === genre).map(movie => movie.toString());
}

// Configurazione delle variabili di ambiente
dotenv.config();

const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    // Creazione delle istanze di Movie e TvSerie
    const mediaInstances = mediaLibrary.map(item => {
        if (item.type === "movie") {
            return new Movie(item.title, item.year, item.genre, item.rating);
        } else if (item.type === "tv") {
            return new TvSerie(item.title, item.year, item.genre, item.rating, item.seasons);
        }
    });

    // Titolo per i film
    res.write(`<h1>Film</h1>`);
    res.write(`<ul>`);
    mediaInstances.forEach(media => {
        if (media.type === "movie") {
            res.write(`<li>${media.toString()}</li>`);
        }
    });
    res.write(`</ul>`);

    // Titolo per le serie TV
    res.write(`<h1>Serie TV</h1>`);
    res.write(`<ul>`);
    mediaInstances.forEach(media => {
        if (media.type === "tv") {
            res.write(`<li>${media.toString()}</li>`);
        }
    });
    res.write(`</ul>`);

    // Ottieni la lista dei generi senza ripetizioni
    const uniqueGenres = getUniqueGenres(mediaInstances);

    // Stampa la lista dei generi
    res.write(`<h2>Lista dei generi dei film</h2>`);
    res.write(`<ul>`);
    uniqueGenres.forEach(genre => {
        res.write(`<li>${genre}</li>`);
    });
    res.write(`</ul>`);

    // Genere desiderato per calcolare la media dei voti
    const desiredGenre = "Action";
    const averageRatingByGenre = calculateAverageRatingByGenre(mediaLibrary, desiredGenre);

    // Stampa la media dei voti per il genere specificato
    res.write(`<h2>Media per genere ${desiredGenre}</h2>`);
    res.write(`<p>La media dei voti per ${desiredGenre} è: ${averageRatingByGenre}</p>`);

    // Esempio di utilizzo della funzione per ottenere i film di un genere
    const filterGenre = "Action"; 
    const moviesByGenre = filterMoviesByGenre(mediaInstances, filterGenre);

    // Stampa i film del genere specificato
    res.write(`<h2>Film del genere ${filterGenre}</h2>`);
    res.write(`<ul>`);
    moviesByGenre.forEach(movie => {
        res.write(`<li>${movie}</li>`);
    });
    res.write(`</ul>`);

    res.end(); // Fine della risposta
}).listen(port, host, () => {
    const serverUrl = `http://${host}:${port}`;
    console.log(`Server avviato su ${serverUrl}`);
});
