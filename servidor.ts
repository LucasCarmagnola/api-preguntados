import { Request, Response } from 'express';

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const puerto = process.env.PORT || 7999;

app.use(express.json());
app.use(cors());

const preguntasPath = path.join(__dirname, 'public', 'preguntas.json');

app.get('', (req:Request, res:Response) => {

    res.json("api-preguntados");
});


app.get('/pregunta', (req:Request, res:Response) => {
    
    const preguntas = JSON.parse(fs.readFileSync(preguntasPath, 'utf8'));

    const preguntaAleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];
    res.json(preguntaAleatoria);
});

// Ruta para validar la respuesta
// app.post('/validar-respuesta', (req, res) => {
//     const { id, respuestaSeleccionada } = req.body;

//     // Leer archivo JSON
//     const preguntas = JSON.parse(fs.readFileSync('preguntas.json', 'utf8'));

//     // Encontrar la pregunta por ID
//     const pregunta = preguntas.find(p => p.id === id);

//     if (!pregunta) {
//         return res.status(404).json({ mensaje: "Pregunta no encontrada" });
//     }

//     // Verificar si la respuesta es correcta
//     if (pregunta.correctAnswer === respuestaSeleccionada) {
//         res.json({ correcto: true, mensaje: "¡Respuesta correcta!" });
//     } else {
//         res.json({ correcto: false, mensaje: "Respuesta incorrecta" });
//     }
// });

// Servir las imágenes estáticas desde la carpeta "public"
app.use('/fotos', express.static(path.join(__dirname, 'public/fotos')));

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
