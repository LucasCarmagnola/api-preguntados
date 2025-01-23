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

app.use(express.static(path.join(__dirname)));


app.get('/api/pregunta', (req:Request, res:Response) => {

    const categoria = req.query.categoria
    const preguntas = JSON.parse(fs.readFileSync(preguntasPath, 'utf8'));

    const preguntasFiltradas = categoria 
    ? preguntas.filter((p: any) => p.category === categoria) 
    : preguntas;
    

    const preguntaAleatoria = preguntasFiltradas[Math.floor(Math.random() * preguntasFiltradas.length)];
    res.json(preguntaAleatoria);
});



// Servir las imágenes estáticas desde la carpeta "public"
app.use('/fotos', express.static(path.join(__dirname, 'public/fotos')));

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
