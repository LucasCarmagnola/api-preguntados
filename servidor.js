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
//app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', (req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const preguntasPath = path.join(__dirname, 'public', 'preguntas.json');
app.get('/api/test', (req, res) => {
    res.json({ message: 'Test endpoint works!' });
});
app.get('/api/pregunta', (req, res) => {
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
