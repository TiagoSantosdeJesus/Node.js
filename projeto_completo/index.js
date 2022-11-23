const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

let artigos = [
    {título: 'Artigo 1'}
];

app.get('/artigos/ver/: id', (req, res) => {
    let id = req.params.id;
    if (id > 0 && id <= artigos.length) {
        res.status(200).send(artigos[id - 1]);
    } else {
        res.status(404).send('Artigo não encontrato');
    }
});

app.post('/artigos/add', (req, res) =>{
    let artigo = req.body;
    let pos = artigos.length + 1;
    artigos.push(artigo);
    artigo.pos = pos;
    res.status(201).send(artigo);
});

app.put('/artigos/editar/: id', (req, res) =>{
    let id = req.params.id;
    if (id > 0 && id <= artigos.length) {
        let artigo = req.body;
        artigos[id - 1] = artigo;
        res.status(200).send(artigo);
    } else {
        res.status(404).send('Artigo não encontrato');
    }
});

app.delete('/artigos/remover/: id', (req, res) =>{
    let id = req.params.id;
    if (id > 0 && id <= artigos.length) {
        artigos.splice(id - 1, 1);
        res.status(200).send('artigo removido');
    } else {
        res.status(404).send('Artigo não encontrato');
    }
});

app.all('*', (req, res) =>{
    res.status(404).send('Página não encontrada');
});

app.listen(8080, () =>{
    console.log('Ouvindo na porta 8080');
});

