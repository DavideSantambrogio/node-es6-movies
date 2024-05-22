// Importazione dei moduli
const http = require("http");
require('dotenv').config(); // Carica le variabili d'ambiente da .env

// Configurazione delle variabili di ambiente
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

// Importazione dell'array mediaLibrary e delle classi Movie e TvSerie
const mediaLibrary = require("./mediaLibrary");
const Movie = require("./movie");
const TvSerie = require("./tvSeries");

// Creazione delle istanze di Movie e TvSerie
const mediaInstances = mediaLibrary.map(item => {
    if (item.type === "movie") {
        return new Movie(item.title, item.year, item.genre, item.rating);
    } else if (item.type === "tv") {
        return new TvSerie(item.title, item.year, item.genre, item.rating, item.seasons);
    }
});

// Creazione del server HTTP
http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    // Titolo per i film
    res.write("<h1>Movies</h1>");
    res.write("<ul>");
    mediaInstances.forEach(media => {
        if (media.type === "movie") {
            res.write(`<li>${media.toString()}</li>`);
        }
    });
    res.write("</ul>");

    // Titolo per le serie TV
    res.write("<h1>TV Series</h1>");
    res.write("<ul>");
    mediaInstances.forEach(media => {
        if (media.type === "tv") {
            res.write(`<li>${media.toString()}</li>`);
        }
    });
    res.write("</ul>");

    res.end(); // Fine della risposta
}).listen(port, host, () => {
    const serverUrl = `http://${host}:${port}`;
    console.log(`Server avviato su ${serverUrl}`);
});
