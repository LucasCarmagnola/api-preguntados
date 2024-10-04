"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const puerto = process.env.PORT || 7999;
app.use(express.json());
app.use(cors());
const preguntasPath = path.join(__dirname, 'public', 'preguntas.json');
app.get('/', (req, res) => {
    res.json({
        message: "Bienvenido a la API de Preguntados",
        description: "Esta API proporciona preguntas aleatorias sobre diferentes categorías (deportes, famosos, entre otras) para juegos de preguntas y respuestas.",
        routes: [
            {
                method: "GET",
                endpoint: "/pregunta",
                description: "Obtén una pregunta aleatoria de cualquier categoría."
            },
            {
                method: "GET",
                endpoint: "/pregunta?categoria=[categoria]",
                description: "Obtén una pregunta aleatoria filtrada por categoría. Reemplaza [categoria] por la categoría deseada (por ejemplo, 'deporte' o 'famosos').",
                example: "/pregunta?categoria=deporte"
            }
        ],
        parameters: {
            query: {
                categoria: "Opcional. Filtra las preguntas por una categoría específica. Valores posibles: 'deporte', 'famosos', etc."
            }
        },
        example: {
            request: "GET /pregunta?categoria=famosos",
            response: {
                id: 6,
                pregunta: "¿Quién es este famoso?",
                category: "famosos",
                image: "/fotos/vin_diesel.jpg",
                options: ["Vin Diesel", "Dwayne Johnson", "Tom Holland", "Robert Downey Jr."],
                correctAnswer: 0
            }
        },
        note: "Si no se especifica una categoría, la API devolverá una pregunta de cualquier categoría al azar."
    });
});
app.get('/pregunta', (req, res) => {
    const categoria = req.query.categoria;
    const preguntas = JSON.parse(fs.readFileSync(preguntasPath, 'utf8'));
    const preguntasFiltradas = categoria
        ? preguntas.filter((p) => p.category === categoria)
        : preguntas;
    const preguntaAleatoria = preguntasFiltradas[Math.floor(Math.random() * preguntasFiltradas.length)];
    res.json(preguntaAleatoria);
});
// Servir las imágenes estáticas desde la carpeta "public"
app.use('/fotos', express.static(path.join(__dirname, 'public/fotos')));
app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
